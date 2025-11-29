package com.matchup.app.data.auth

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.tasks.await

class AuthRepository(
    private val auth: FirebaseAuth,
    private val db: FirebaseDatabase
) {

    /** --------------------------------------------------------
     * LOGIN POR EMAIL - igual ao loginEmail.ts do Next.js
     * --------------------------------------------------------- */
    suspend fun signInWithEmail(email: String, password: String): Result<FirebaseUser> {
        return try {
            val res = auth.signInWithEmailAndPassword(email, password).await()
            Result.success(res.user!!)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    /** --------------------------------------------------------
     * CRIAÇÃO DE CONTA - igual create user do Next.js
     * --------------------------------------------------------- */
    suspend fun createWithEmail(email: String, password: String): Result<FirebaseUser> {
        return try {
            val res = auth.createUserWithEmailAndPassword(email, password).await()
            val user = res.user!!

            // cria registro no Realtime Database igual ao Next.js
            val userData = mapOf(
                "uid" to user.uid,
                "nome" to "",
                "idade" to 0,
                "cidade" to "",
                "sobre" to "",
                "fotos" to emptyList<String>(),
                "linguas" to emptyList<String>()
            )
            db.getReference("users").child(user.uid).setValue(userData).await()

            Result.success(user)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    /** --------------------------------------------------------
     * LOGIN COM GOOGLE - equivalente ao loginGoogle.ts
     * Recebe o idToken obtido pelo GoogleSignInClient no Android
     * --------------------------------------------------------- */
    suspend fun signInWithGoogle(idToken: String): Result<FirebaseUser> {
        return try {
            val credential = GoogleAuthProvider.getCredential(idToken, null)
            val res = auth.signInWithCredential(credential).await()
            val user = res.user!!

            // garante que existe no DB
            val userRef = db.getReference("users").child(user.uid)
            val snapshot = userRef.get().await()
            if (!snapshot.exists()) {
                val baseUser = mapOf(
                    "uid" to user.uid,
                    "nome" to (user.displayName ?: ""),
                    "idade" to 0,
                    "cidade" to "",
                    "sobre" to "",
                    "fotos" to emptyList<String>(),
                    "linguas" to emptyList<String>()
                )
                userRef.setValue(baseUser).await()
            }

            Result.success(user)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    fun signOut() {
        auth.signOut()
    }

    fun currentUser(): FirebaseUser? = auth.currentUser
}
