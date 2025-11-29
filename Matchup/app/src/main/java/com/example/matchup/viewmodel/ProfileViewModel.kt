package com.matchup.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.matchup.app.data.realtime.RealtimeRepository
import com.matchup.app.data.cloudinary.CloudinaryRepository
import com.matchup.app.models.UserModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import com.google.firebase.auth.FirebaseAuth

class ProfileViewModel(
    private val realtimeRepo: RealtimeRepository,
    private val cloudRepo: CloudinaryRepository
): ViewModel() {

    private val _user = MutableStateFlow<UserModel?>(null)
    val user: StateFlow<UserModel?> = _user

    private val _editando = MutableStateFlow(false)
    val editando: StateFlow<Boolean> = _editando

    fun loadCurrentUser() {
        val uid = FirebaseAuth.getInstance().currentUser?.uid ?: return
        viewModelScope.launch {
            val data = realtimeRepo.getUser(uid)
            data?.let {
                val model = UserModel(
                    uid = uid,
                    nome = it["nome"]?.toString() ?: "",
                    idade = (it["idade"] as? Long)?.toInt() ?: 0,
                    cidade = it["cidade"]?.toString() ?: "",
                    altura = it["altura"]?.toString(),
                    linguas = (it["linguas"] as? List<String>) ?: emptyList(),
                    sobre = it["sobre"]?.toString(),
                    fotos = (it["fotos"] as? List<String>) ?: emptyList()
                )
                _user.value = model
            }
        }
    }

    fun toggleEditing() {
        _editando.value = !_editando.value
    }

    fun savePerfil(updated: UserModel) {
        val uid = updated.uid.ifBlank { FirebaseAuth.getInstance().currentUser?.uid ?: "" }
        if (uid.isBlank()) return
        viewModelScope.launch {
            val map = mapOf(
                "uid" to uid,
                "nome" to updated.nome,
                "idade" to updated.idade,
                "cidade" to updated.cidade,
                "altura" to updated.altura,
                "linguas" to updated.linguas,
                "sobre" to updated.sobre,
                "fotos" to updated.fotos
            )
            realtimeRepo.saveUser(uid, map)
            _user.value = updated
            _editando.value = false
        }
    }

    fun removeFoto(index: Int) {
        val current = _user.value ?: return
        val fotos = current.fotos.toMutableList()
        if (index in fotos.indices) {
            // ideal: chamar backend delete via CloudinaryRepository.deleteImageViaBackend
            fotos.removeAt(index)
            val updated = current.copy(fotos = fotos)
            savePerfil(updated)
        }
    }

    fun addFotoFromUri(context: android.content.Context, uri: android.net.Uri) {
        val uid = FirebaseAuth.getInstance().currentUser?.uid ?: return
        viewModelScope.launch {
            try {
                val url = cloudRepo.uploadUri(context, uri)
                val current = _user.value
                if (current != null) {
                    val fotos = current.fotos.toMutableList()
                    fotos.add(url)
                    val updated = current.copy(fotos = fotos)
                    savePerfil(updated)
                }
            } catch (e: Exception) {
                // tratar erro
            }
        }
    }

    fun cancelarEdicao() {
        _editando.value = false
        loadCurrentUser()
    }
}
