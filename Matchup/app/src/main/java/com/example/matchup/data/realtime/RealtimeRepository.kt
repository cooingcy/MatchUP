package com.matchup.app.data.realtime

import com.google.firebase.database.*
import com.google.firebase.database.ktx.getValue
import com.matchup.app.models.ChatMessage
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.CompletableDeferred
import java.util.*

/**
 * RealtimeRepository - aprimorado
 *
 * - observeUsers / removeUsersListener: observa lista completa de users (para Home feed)
 * - observeChatMessages / removeChatListener: observa mensagens de um chatId
 * - observeChatListForUser / removeChatListListener: observa lista de chats de um usuário (chat summaries)
 * - pushMessage: envia mensagem (com ServerValue.TIMESTAMP)
 * - createOrGetChatBetween: cria ou retorna um chatId entre dois usuários (útil para iniciar conversa)
 * - getUser / saveUser: leitura/escrita simples
 *
 * Observers retornam ValueEventListener para que o chamador possa removê-los facilmente.
 */
class RealtimeRepository(private val db: FirebaseDatabase) {

    private val usersRef: DatabaseReference get() = db.getReference("users")
    private val chatsRef: DatabaseReference get() = db.getReference("chats")
    private val userChatsRef: DatabaseReference get() = db.getReference("user_chats") // index opcional: user_chats/{uid}/{chatId: true}

    // -------------------------
    // Users
    // -------------------------
    suspend fun getUser(uid: String): Map<String, Any>? {
        val snap = usersRef.child(uid).get().await()
        return snap.value as? Map<String, Any>
    }

    suspend fun saveUser(uid: String, data: Map<String, Any>) {
        usersRef.child(uid).setValue(data).await()
    }

    /**
     * Observa todos os usuários (sem filtros). Use com cuidado em apps grandes.
     * Retorna o ValueEventListener para remover depois com removeUsersListener.
     */
    fun observeUsers(listener: (List<Map<String, Any>>) -> Unit): ValueEventListener {
        val l = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<Map<String, Any>>()
                snapshot.children.forEach { child ->
                    val map = child.value as? Map<String, Any>
                    map?.let { list.add(it) }
                }
                listener(list)
            }

            override fun onCancelled(error: DatabaseError) {
                // Opcional: propagar erro via callback ou log
            }
        }
        usersRef.addValueEventListener(l)
        return l
    }

    fun removeUsersListener(listener: ValueEventListener) {
        usersRef.removeEventListener(listener)
    }

    // -------------------------
    // Chats / Messages
    // -------------------------

    /**
     * Observa mensagens de um chat (chats/{chatId}/messages).
     * Retorna o ValueEventListener para remover posteriormente.
     */
    fun observeChatMessages(chatId: String, listener: (List<ChatMessage>) -> Unit): ValueEventListener {
        val ref = chatsRef.child(chatId).child("messages")
        val l = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<ChatMessage>()
                snapshot.children.forEach { m ->
                    val map = m.getValue<Map<String, Any>>()
                    if (map != null) {
                        val ts = when (val raw = map["timestamp"]) {
                            is Long -> raw
                            is Double -> raw.toLong()
                            is Number -> raw.toLong()
                            else -> 0L
                        }
                        val msg = ChatMessage(
                            id = m.key ?: "",
                            sender = (map["sender"] as? String) ?: "",
                            text = (map["text"] as? String) ?: "",
                            timestamp = ts
                        )
                        list.add(msg)
                    }
                }
                // ordenar por timestamp (asc)
                list.sortBy { it.timestamp }
                listener(list)
            }

            override fun onCancelled(error: DatabaseError) {
                // log/propagar
            }
        }
        ref.addValueEventListener(l)
        return l
    }

    /**
     * Remove listener do chat (quando você guardou a referência).
     */
    fun removeChatListener(chatId: String, listener: ValueEventListener) {
        chatsRef.child(chatId).child("messages").removeEventListener(listener)
    }

    /**
     * Envia mensagem para chats/{chatId}/messages com ServerValue.TIMESTAMP.
     * Retorna o id da mensagem gerada (push key).
     */
    fun pushMessage(chatId: String, message: Map<String, Any>): String {
        val ref = chatsRef.child(chatId).child("messages").push()
        val toSave = HashMap<String, Any>(message)
        toSave["timestamp"] = ServerValue.TIMESTAMP
        ref.setValue(toSave)
        return ref.key ?: ""
    }

    // -------------------------
    // Chat list (por usuário)
    // -------------------------
    /**
     * Observa lista de chats de um usuário.
     * Recomendado ter no RealtimeDB um índice user_chats/{uid}/{chatId: true} ou
     * salvar em users/{uid}/chats/{chatId: true} dependendo do seu modelo.
     *
     * Esse método assume um path 'user_chats/{uid}' com filhos contendo chave = chatId e valor = map (ex: lastMessage, timestamp, participants).
     */
    fun observeChatListForUser(uid: String, listener: (List<Map<String, Any>>) -> Unit): ValueEventListener {
        val ref = userChatsRef.child(uid)
        val l = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<Map<String, Any>>()
                snapshot.children.forEach { c ->
                    val map = c.getValue<Map<String, Any>>()
                    map?.let {
                        val enriched = HashMap<String, Any>(it)
                        enriched["chatId"] = c.key ?: ""
                        list.add(enriched)
                    }
                }
                // opcional: ordenar por timestamp (se existir)
                list.sortBy { (it["timestamp"] as? Long) ?: 0L }
                listener(list)
            }

            override fun onCancelled(error: DatabaseError) {}
        }
        ref.addValueEventListener(l)
        return l
    }

    fun removeChatListListener(uid: String, listener: ValueEventListener) {
        userChatsRef.child(uid).removeEventListener(listener)
    }

    // -------------------------
    // Helpers: criação / recuperação de chat
    // -------------------------
    /**
     * Cria um novo chat e retorna o chatId.
     * Estrutura sugerida:
     * chats/{chatId} = { participants: { uid1: true, uid2: true }, createdAt: ServerValue.TIMESTAMP, messages: { ... } }
     *
     * Também adiciona índice em user_chats/{uid}/{chatId} = { lastMessage: "", timestamp: ServerValue.TIMESTAMP }
     */
    suspend fun createChat(participants: List<String>): String {
        val ref = chatsRef.push()
        val chatId = ref.key ?: UUID.randomUUID().toString()
        val participantsMap = participants.associateWith { true }
        val payload = mapOf(
            "participants" to participantsMap,
            "createdAt" to ServerValue.TIMESTAMP
        )
        ref.setValue(payload).await()

        // index in user_chats
        val updates = hashMapOf<String, Any>()
        val now = ServerValue.TIMESTAMP
        participants.forEach { uid ->
            updates["/user_chats/$uid/$chatId"] = mapOf("chatId" to chatId, "timestamp" to now)
        }
        db.reference.updateChildren(updates).await()
        return chatId
    }

    /**
     * Tenta encontrar um chat existente entre dois usuários (simples: busca user_chats/{uid} por chat com participant).
     * Se não achar, cria um novo chat.
     */
    suspend fun createOrGetChatBetween(userA: String, userB: String): String {
        // estratégia simples: varrer chats e achar um que tenha os dois participants.
        // Se a base for grande, mantenha index user_chats com participants para consulta eficiente.
        val snapshot = chatsRef.get().await()
        snapshot.children.forEach { c ->
            val participants = c.child("participants")
            if (participants.hasChild(userA) && participants.hasChild(userB)) {
                return c.key ?: ""
            }
        }
        // se não encontrou, cria
        return createChat(listOf(userA, userB))
    }

    // -------------------------
    // Utility: read once chat list (synchronous)
    // -------------------------
    suspend fun getChatListForUserOnce(uid: String): List<Map<String, Any>> {
        val snap = userChatsRef.child(uid).get().await()
        val list = mutableListOf<Map<String, Any>>()
        snap.children.forEach { c ->
            val map = c.getValue<Map<String, Any>>()
            map?.let {
                val enriched = HashMap<String, Any>(it)
                enriched["chatId"] = c.key ?: ""
                list.add(enriched)
            }
        }
        return list
    }
}
