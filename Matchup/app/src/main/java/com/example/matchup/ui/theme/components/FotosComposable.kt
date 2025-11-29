package com.matchup.app.ui.components

import androidx.compose.runtime.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage

@Composable
fun FotosComposable(
    fotos: List<String>,
    editando: Boolean,
    onRemove: (Int) -> Unit,
    onAddPhoto: () -> Unit
) {
    LazyRow(
        modifier = Modifier
            .padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {

        // --------------------------
        // ADD BUTTON (mesmo do Next)
        // --------------------------
        if (editando) {
            item {
                Box(
                    modifier = Modifier
                        .size(160.dp)
                        .background(Color(0xFF2A2A2D), RoundedCornerShape(16.dp))
                        .border(2.dp, Color(0xFFFF5A8D), RoundedCornerShape(16.dp))
                        .clickable { onAddPhoto() },
                    contentAlignment = Alignment.Center
                ) {
                    Text("+", color = Color.White, style = MaterialTheme.typography.headlineLarge)
                }
            }
        }

        // --------------------------
        // LISTA DE FOTOS
        // --------------------------
        itemsIndexed(fotos) { idx, url ->
            Box(
                modifier = Modifier
                    .size(160.dp)
                    .background(Color(0xFF1E1E1F), RoundedCornerShape(16.dp))
            ) {

                AsyncImage(
                    model = url,
                    contentDescription = null,
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color.Black, RoundedCornerShape(16.dp))
                )

                // --------------------------
                // BOTÃO REMOVER (se editando)
                // --------------------------
                if (editando) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(6.dp)
                            .size(32.dp)
                            .background(Color(0xCC000000), RoundedCornerShape(50))
                            .clickable { onRemove(idx) },
                        contentAlignment = Alignment.Center
                    ) {
                        Text("X", color = Color.White)
                    }
                }

                // --------------------------
                // TAG "foto principal"
                // --------------------------
                if (idx == 0) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(6.dp)
                            .background(Color(0xAA000000), RoundedCornerShape(8.dp))
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Text("Principal", color = Color.White, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }
    }
}
