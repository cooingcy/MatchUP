package com.matchup.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavController
import com.matchup.app.ui.components.UserCard
import com.matchup.app.viewmodel.UsersViewModel
import com.matchup.app.models.UserModel

@Composable
fun HomeScreen(
    navController: NavController,
    viewModel: UsersViewModel
) {
    val users by viewModel.users.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.start()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0E0E10))
            .padding(16.dp)
    ) {
        users.forEach { map ->
            val u = UserModel(
                uid = map["uid"].toString(),
                nome = map["nome"].toString(),
                idade = (map["idade"] as? Long)?.toInt() ?: 0,
                cidade = map["cidade"].toString(),
                fotos = (map["fotos"] as? List<String>) ?: emptyList()
            )

            UserCard(
                user = u,
                onLike = { /* enviar match */ },
                onDislike = { /* ignorar */ }
            )

            Spacer(Modifier.height(20.dp))
        }
    }
}
