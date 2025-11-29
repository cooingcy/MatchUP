package com.matchup.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.matchup.app.models.UserModel

/**
 * UserCard – baseado no Card.tsx do Next.js
 *
 * - Mostra foto atual
 * - Setas de avançar/voltar
 * - Indicadores alinhados como no seu frontend
 * - Botões de Like/Dislike iguais aos do web
 */

@Composable
fun UserCard(
    user: UserModel,
    modifier: Modifier = Modifier,
    onLike: () -> Unit,
    onDislike: () -> Unit
) {
    var index by remember { mutableStateOf(0) }
    val fotos = user.fotos

    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(480.dp)
            .background(Color(0xFF121214), RoundedCornerShape(24.dp))
    ) {

        // =====================
        // FOTO PRINCIPAL
        // =====================
        if (fotos.isNotEmpty()) {
            AsyncImage(
                model = fotos[index],
                contentDescription = null,
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.Black, RoundedCornerShape(24.dp))
            )
        } else {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Sem fotos", color = Color.White)
            }
        }

        // =====================
        // SETA ESQUERDA
        // =====================
        if (fotos.size > 1) {
            Box(
                modifier = Modifier
                    .align(Alignment.CenterStart)
                    .padding(start = 12.dp)
                    .size(36.dp)
                    .background(Color(0x66000000), CircleShape)
                    .clickable {
                        index = if (index > 0) index - 1 else fotos.size - 1
                    },
                contentAlignment = Alignment.Center
            ) {
                Text("<", color = Color.White, style = MaterialTheme.typography.bodyLarge)
            }

            // SETA DIREITA
            Box(
                modifier = Modifier
                    .align(Alignment.CenterEnd)
                    .padding(end = 12.dp)
                    .size(36.dp)
                    .background(Color(0x66000000), CircleShape)
                    .clickable {
                        index = if (index < fotos.size - 1) index + 1 else 0
                    },
                contentAlignment = Alignment.Center
            ) {
                Text(">", color = Color.White, style = MaterialTheme.typography.bodyLarge)
            }
        }

        // =====================
        // INDICADORES DE FOTO
        // =====================
        Row(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 12.dp),
            horizontalArrangement = Arrangement.Center
        ) {
            fotos.forEachIndexed { i, _ ->
                val active = i == index
                Box(
                    modifier = Modifier
                        .padding(horizontal = 3.dp)
                        .size(if (active) 10.dp else 8.dp)
                        .background(
                            if (active) Color.White else Color(0x55FFFFFF),
                            CircleShape
                        )
                )
            }
        }

        // =====================
        // INFORMAÇÕES DO USUÁRIO
        // =====================
        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(20.dp)
        ) {
            Text(
                user.nome,
                color = Color.White,
                style = MaterialTheme.typography.titleLarge
            )
            Text(
                "${user.idade} anos • ${user.cidade}",
                color = Color(0xCCFFFFFF),
                style = MaterialTheme.typography.bodySmall
            )
        }

        // =====================
        // BOTÕES LIKE / DISLIKE
        // =====================
        Row(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(40.dp)
        ) {
            // DISLIKE
            Box(
                modifier = Modifier
                    .size(65.dp)
                    .background(Color(0xFF1E1E1F), CircleShape)
                    .clickable { onDislike() },
                contentAlignment = Alignment.Center
            ) {
                Text("X", color = Color(0xFFFF5A8D), style = MaterialTheme.typography.headlineMedium)
            }

            // LIKE
            Box(
                modifier = Modifier
                    .size(65.dp)
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFFFF5A8D), Color(0xFF7C4DFF))
                        ),
                        CircleShape
                    )
                    .clickable { onLike() },
                contentAlignment = Alignment.Center
            ) {
                Text("❤", color = Color.White, style = MaterialTheme.typography.headlineMedium)
            }
        }
    }
}
