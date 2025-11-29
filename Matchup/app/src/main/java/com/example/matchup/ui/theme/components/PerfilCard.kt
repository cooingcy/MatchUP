package com.matchup.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.matchup.app.models.UserModel

@Composable
fun PerfilCard(
    user: UserModel,
    editando: Boolean,
    onSave: (UserModel) -> Unit,
    onCancel: () -> Unit
) {
    var nome by remember { mutableStateOf(user.nome) }
    var idade by remember { mutableStateOf(user.idade.toString()) }
    var cidade by remember { mutableStateOf(user.cidade) }
    var sobre by remember { mutableStateOf(user.sobre ?: "") }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = CardDefaults.cardColors(Color(0xFF1A1A1D)),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(Modifier.padding(16.dp)) {

            Text("Informações", color = Color.White, style = MaterialTheme.typography.titleMedium)

            Spacer(Modifier.height(16.dp))

            if (editando) {
                OutlinedTextField(
                    value = nome,
                    onValueChange = { nome = it },
                    label = { Text("Nome") },
                    modifier = Modifier.fillMaxWidth(),
                    textStyle = MaterialTheme.typography.bodyMedium,
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = Color.White,
                        focusedBorderColor = Color(0xFFFF5A8D),
                        focusedLabelColor = Color(0xFFFF5A8D),
                        cursorColor = Color(0xFFFF5A8D)
                    )
                )

                Spacer(Modifier.height(12.dp))

                OutlinedTextField(
                    value = idade,
                    onValueChange = { idade = it },
                    label = { Text("Idade") },
                    modifier = Modifier.fillMaxWidth(),
                    textStyle = MaterialTheme.typography.bodyMedium,
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = Color.White,
                        focusedBorderColor = Color(0xFFFF5A8D),
                        focusedLabelColor = Color(0xFFFF5A8D),
                        cursorColor = Color(0xFFFF5A8D)
                    )
                )

                Spacer(Modifier.height(12.dp))

                OutlinedTextField(
                    value = cidade,
                    onValueChange = { cidade = it },
                    label = { Text("Cidade") },
                    modifier = Modifier.fillMaxWidth(),
                    textStyle = MaterialTheme.typography.bodyMedium,
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = Color.White,
                        focusedBorderColor = Color(0xFFFF5A8D),
                        focusedLabelColor = Color(0xFFFF5A8D),
                        cursorColor = Color(0xFFFF5A8D)
                    )
                )

                Spacer(Modifier.height(12.dp))

                OutlinedTextField(
                    value = sobre,
                    onValueChange = { sobre = it },
                    label = { Text("Sobre") },
                    modifier = Modifier.fillMaxWidth(),
                    textStyle = MaterialTheme.typography.bodyMedium,
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = Color.White,
                        focusedBorderColor = Color(0xFFFF5A8D),
                        focusedLabelColor = Color(0xFFFF5A8D),
                        cursorColor = Color(0xFFFF5A8D)
                    )
                )

                Spacer(Modifier.height(16.dp))

                Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                    Button(
                        onClick = onCancel,
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF333333))
                    ) {
                        Text("Cancelar", color = Color.White)
                    }

                    Button(
                        onClick = {
                            val updated = user.copy(
                                nome = nome,
                                idade = idade.toIntOrNull() ?: user.idade,
                                cidade = cidade,
                                sobre = sobre
                            )
                            onSave(updated)
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFF5A8D))
                    ) {
                        Text("Salvar", color = Color.White)
                    }
                }
            }

            if (!editando) {
                Text(nome, color = Color.White, style = MaterialTheme.typography.titleLarge)
                Text("${user.idade} anos — ${user.cidade}", color = Color(0xFFBBBBBB))
                Spacer(Modifier.height(12.dp))
                Text(sobre.ifBlank { "Sem descrição" }, color = Color.White)
            }
        }
    }
}
