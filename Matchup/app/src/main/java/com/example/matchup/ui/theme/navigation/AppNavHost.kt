package com.matchup.app.ui.navigation

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.matchup.app.ui.screens.*
import com.matchup.app.ui.components.TopBar
import com.matchup.app.ui.components.BottomBar
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavBackStackEntry

object Routes {
    const val SPLASH = "splash"
    const val LOGIN = "login"
    const val HOME = "home"
    const val CHAT_LIST = "chat_list"
    const val CHAT = "chat/{chatId}"
    const val PROFILE = "profile"
    const val EDIT_PROFILE = "edit_profile"

    fun chatRoute(chatId: String) = "chat/$chatId"
}

data class BottomNavItem(val route: String, val label: String, val icon: ImageVector)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppNavHost(modifier: Modifier = Modifier) {
    val navController = rememberNavController()

    val bottomItems = listOf(
        BottomNavItem(Routes.HOME, "Home", Icons.Default.Home),
        BottomNavItem(Routes.CHAT_LIST, "Conversas", Icons.Default.Chat),
        BottomNavItem(Routes.PROFILE, "Perfil", Icons.Default.Person)
    )

    Scaffold(
        topBar = {
            TopBar(
                onMenuClick = { /* abrir menu lateral */ },
                onAccountClick = { navController.navigate(Routes.PROFILE) }
            )
        },
        bottomBar = {
            val backStackEntry by navController.currentBackStackEntryAsState()
            val currentRoute = backStackEntry?.destination?.route
            val showBottom = currentRoute != Routes.SPLASH && currentRoute != Routes.LOGIN && currentRoute?.startsWith("chat/") != true
            if (showBottom) {
                BottomBar(items = bottomItems, currentRoute = currentRoute, onItemSelected = { route ->
                    if (route != currentRoute) {
                        navController.navigate(route) {
                            popUpTo(navController.graph.startDestinationId) { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                })
            }
        },
        modifier = modifier
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Routes.SPLASH,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Routes.SPLASH) {
                SplashScreen(onFinished = {
                    // checar auth e navegar
                    navController.navigate(Routes.LOGIN) {
                        popUpTo(Routes.SPLASH) { inclusive = true }
                    }
                })
            }

            composable(Routes.LOGIN) {
                LoginScreen(
                    onLoginSuccess = {
                        navController.navigate(Routes.HOME) {
                            popUpTo(Routes.LOGIN) { inclusive = true }
                        }
                    }
                )
            }

            composable(Routes.HOME) {
                HomeScreen(navController = navController)
            }

            composable(Routes.CHAT_LIST) {
                ChatListScreen(navController = navController)
            }

            composable(
                route = Routes.CHAT,
                arguments = listOf(navArgument("chatId") { type = NavType.StringType })
            ) { backStackEntry: NavBackStackEntry ->
                val chatId = backStackEntry.arguments?.getString("chatId") ?: ""
                ChatScreen(chatId = chatId, navController = navController)
            }

            composable(Routes.PROFILE) {
                ProfileScreen(navController = navController)
            }

            composable(Routes.EDIT_PROFILE) {
                EditProfileScreen(navController = navController)
            }
        }
    }
}
