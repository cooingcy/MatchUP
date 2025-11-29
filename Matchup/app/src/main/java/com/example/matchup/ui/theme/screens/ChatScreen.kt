package com.matchup.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.matchup.app.viewmodel.ChatViewModel
import com.matchup.app.ui.components.MessageBubble

@Composable
fun ChatScreen(
    chatId: String,
    navController: NavController,
    viewModel: ChatViewModel
) {
    val messages by viewModel.messages.collectAsState()
    val currentUid = viewModel.currentUserId()

    LaunchedEffect(chatId) {
        viewModel.startChat(chatId)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0E0E10))
    ) {
        // ---------------------
        // Lista
        // ---------------------
        LazyColumn(
            modifier = Modifier.weight(1f),
            contentPadding = PaddingValues(12.dp)
        ) {
            items(messages) { msg ->
                MessageBubble(
                    message = msg,
                    currentUid = currentUid
                )
            }
        }

        // ---------------------
        // Input de mensagem
        // ---------------------
        var text by remember { mutableStateOf("") }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = text,
                onValueChange = { text = it },
                modifier = Modifier.weight(1f),
                textStyle = MaterialTheme.typography.bodyMedium,
                colors = TextFieldDefaults.outlinedTextFieldColors(
                    textColor = Color.White,
                    focusedBorderColor = Color(0xFFFF5A8D),
                    cursorColor = Color(0xFFFF5A8D)
                )
            )

            Spacer(Modifier.width(8.dp))

            Button(
                onClick = {
                    if (text.isNotBlank()) {
                        viewModel.sendMessage(chatId, text)
                        text = ""
                    }
                },
                colors = ButtonDefaults.buttonColors(Color(0xFFFF5A8D))
            ) {
                Text("Enviar", color = Color.White)
            }
        }
    }
}
