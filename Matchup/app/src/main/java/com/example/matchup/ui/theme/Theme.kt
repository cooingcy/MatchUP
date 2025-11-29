package com.matchup.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.material3.Typography
import androidx.compose.material3.Shapes
import androidx.compose.ui.graphics.Color

private val DarkColors = darkColorScheme(
    primary = Color(0xFFFF5A8D),
    secondary = Color(0xFF7C4DFF),
    background = Color(0xFF0E0E10),
    surface = Color(0xFF141416),
    onSurface = Color.White
)

@Composable
fun MatchUpTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColors,
        typography = Typography(),
        shapes = Shapes(),
        content = content
    )
}

