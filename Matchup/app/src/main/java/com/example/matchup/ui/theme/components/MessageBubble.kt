package com.matchup.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import com.matchup.app.models.ChatMessage

/**
 * MessageBubble - composable baseado em MessageBubble.tsx
 *
 * - Mantém estilo para mensagens próprias (gradiente rosa->roxo) e alheias (fundo escuro)
 * - Exibe hora formatada HH:mm
 * - Limita largura para ficar parecido com a versão web
 */
@Composable
fun MessageBubble(message: ChatMessage, currentUid: String, modifier: Modifier = Modifier) {
    val isOwn = message.sender == currentUid

    // Formata timestamp (assume Long em ms)
    val timeText = remember(message.timestamp) {
        try {
            val date = java.util.Date(message.timestamp)
            java.text.SimpleDateFormat("HH:mm", java.util.Locale.getDefault()).format(date)
        } catch (e: Exception) {
            ""
        }
    }

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 6.dp),
        horizontalArrangement = if (isOwn) Arrangement.End else Arrangement.Start
    ) {
        Box(
            modifier = Modifier
                .widthIn(max = 320.dp)
                .wrapContentWidth()
                .background(
                    brush = if (isOwn)
                        Brush.horizontalGradient(listOf(Color(0xFFFF5A8D), Color(0xFF7C4DFF)))
                    else
                        Brush.linearGradient(listOf(Color(0xFF2A2A2D), Color(0xFF2A2A2D))),
                    shape = RoundedCornerShape(
                        topStart = 16.dp,
                        topEnd = 16.dp,
                        bottomEnd = if (isOwn) 0.dp else 16.dp,
                        bottomStart = if (isOwn) 16.dp else 0.dp
                    )
                )
                .padding(horizontal = 14.dp, vertical = 10.dp)
        ) {
            Column(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = message.text,
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.White
                )

                Spacer(modifier = Modifier.height(6.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.End
                ) {
                    Text(
                        text = timeText,
                        style = MaterialTheme.typography.labelSmall,
                        color = if (isOwn) Color(0xFFFFCDE6) else Color(0xFFBDBDBD)
                    )
                }
            }

            // small triangle/tail can be added later via Canvas if needed
        }
    }
}
