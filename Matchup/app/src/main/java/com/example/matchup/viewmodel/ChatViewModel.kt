package com.matchup.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.matchup.app.data.realtime.RealtimeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import com.matchup.app.models.ChatMessage
import com.google.firebase.database.ValueEventListener
import com.google.firebase.auth.FirebaseAuth

class ChatViewModel(private val repo: RealtimeRepository): ViewModel() {
    private val _messages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val messages: StateFlow<List<ChatMessage>> = _messages

    private var listenerRef: ValueEventListener? = null

    fun startChat(chatId: String) {
        if (listenerRef != null) return
        listenerRef = repo.observeChatMessages(chatId) { list ->
            viewModelScope.launch { _messages.value = list }
        }
    }

    fun stopChat(chatId: String) {
        listenerRef?.let { repo.removeChatListener(chatId, it) }
        listenerRef = null
    }

    fun sendMessage(chatId: String, text: String) {
        val uid = FirebaseAuth.getInstance().currentUser?.uid ?: return
        val msg = mapOf(
            "sender" to uid,
            "text" to text
            // timestamp injected by ServerValue.TIMESTAMP in repository
        )
        repo.pushMessage(chatId, msg)
    }

    fun currentUserId(): String {
        return FirebaseAuth.getInstance().currentUser?.uid ?: ""
    }
}
