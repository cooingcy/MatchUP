package com.matchup.app.data

import android.content.Context
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.storage.FirebaseStorage

object FirebaseModule {
    fun init(context: Context) {
        FirebaseApp.initializeApp(context)
    }
    val auth: FirebaseAuth get() = FirebaseAuth.getInstance()
    val db: FirebaseDatabase get() = FirebaseDatabase.getInstance()
    val storage: FirebaseStorage get() = FirebaseStorage.getInstance()
}
