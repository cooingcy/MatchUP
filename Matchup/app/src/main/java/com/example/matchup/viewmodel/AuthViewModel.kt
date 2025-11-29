package com.matchup.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.matchup.app.data.auth.AuthRepository
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import com.google.firebase.auth.FirebaseUser

class AuthViewModel(private val repo: AuthRepository): ViewModel() {
    private val _user = MutableStateFlow<FirebaseUser?>(repo.currentUser())
    val user: StateFlow<FirebaseUser?> = _user

    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading

    fun signOut() {
        repo.signOut()
        _user.value = null
    }

    fun signInEmail(email: String, password: String, onResult: (Boolean, String?) -> Unit) {
        _loading.value = true
        viewModelScope.launch {
            try {
                val res = repo.signInWithEmail(email, password)
                if (res.isSuccess) {
                    _user.value = res.getOrNull()
                    onResult(true, null)
                } else {
                    onResult(false, res.exceptionOrNull()?.localizedMessage)
                }
            } catch (e: Exception) {
                onResult(false, e.localizedMessage)
            } finally {
                _loading.value = false
            }
        }
    }

    fun createWithEmail(email: String, password: String, onResult: (Boolean, String?) -> Unit) {
        _loading.value = true
        viewModelScope.launch {
            try {
                val res = repo.createWithEmail(email, password)
                if (res.isSuccess) {
                    _user.value = res.getOrNull()
                    onResult(true, null)
                } else {
                    onResult(false, res.exceptionOrNull()?.localizedMessage)
                }
            } catch (e: Exception) {
                onResult(false, e.localizedMessage)
            } finally {
                _loading.value = false
            }
        }
    }

    suspend fun signInWithGoogle(idToken: String): Result<FirebaseUser> {
        return repo.signInWithGoogle(idToken)
    }
}
