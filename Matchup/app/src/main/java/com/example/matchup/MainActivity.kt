package com.matchup.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.matchup.app.ui.navigation.AppNavHost
import com.matchup.app.ui.theme.MatchUpTheme
import com.matchup.app.data.FirebaseModule

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FirebaseModule.init(applicationContext)
        setContent {
            MatchUpTheme {
                AppNavHost() // <-- composable
            }
        }
    }
}
