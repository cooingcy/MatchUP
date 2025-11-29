package com.matchup.app.models

data class UserModel(
    val uid: String = "",
    val nome: String = "",
    val idade: Int = 0,
    val cidade: String = "",
    val altura: String? = null,
    val linguas: List<String> = emptyList(),
    val sobre: String? = null,
    val fotos: List<String> = emptyList()
)
