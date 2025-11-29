package com.matchup.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.matchup.app.data.realtime.RealtimeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import com.google.firebase.database.ValueEventListener

class UsersViewModel(private val repo: RealtimeRepository): ViewModel() {
    private val _users = MutableStateFlow<List<Map<String, Any>>>(emptyList())
    val users: StateFlow<List<Map<String, Any>>> = _users

    private var listenerRef: ValueEventListener? = null

    fun start() {
        if (listenerRef != null) return
        listenerRef = repo.observeUsers { list ->
            viewModelScope.launch { _users.value = list }
        }
    }

    fun stop() {
        listenerRef?.let { repo.removeUsersListener(it) }
        listenerRef = null
    }
}
