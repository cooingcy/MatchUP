package com.matchup.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import com.matchup.app.ui.components.FotosComposable
import com.matchup.app.ui.components.PerfilCard
import com.matchup.app.viewmodel.ProfileViewModel

@Composable
fun ProfileScreen(
    navController: NavController,
    viewModel: ProfileViewModel
) {
    val user by viewModel.user.collectAsState()
    val editando by viewModel.editando.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0E0E10))
    ) {
        user?.let { u ->
            FotosComposable(
                fotos = u.fotos,
                editando = editando,
                onRemove = { viewModel.removeFoto(it) },
                onAddPhoto = { viewModel.addFoto() }
            )

            PerfilCard(
                user = u,
                editando = editando,
                onSave = { viewModel.savePerfil(it) },
                onCancel = { viewModel.cancelarEdicao() }
            )
        }
    }
}
