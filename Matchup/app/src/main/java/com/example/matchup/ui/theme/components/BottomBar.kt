package com.matchup.app.ui.components

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.material3.Icon
import androidx.compose.material3.Text

data class BottomNavItem(val route: String, val label: String, val icon: ImageVector)

@Composable
fun BottomBar(items: List<BottomNavItem>, currentRoute: String?, onItemSelected: (String) -> Unit) {
    NavigationBar {
        items.forEach { item ->
            val selected = currentRoute == item.route
            NavigationBarItem(
                icon = { Icon(item.icon, contentDescription = item.label) },
                label = { Text(item.label) },
                selected = selected,
                onClick = { onItemSelected(item.route) }
            )
        }
    }
}
