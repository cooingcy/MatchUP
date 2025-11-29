package com.matchup.app.utils

import android.content.Context
import android.net.Uri
import java.io.File
import java.io.FileOutputStream

object ImageUtils {
    // Convert content Uri to temporary File for upload
    fun uriToFile(context: Context, uri: Uri, name: String = "upload.jpg"): File {
        val input = context.contentResolver.openInputStream(uri)!!
        val file = File(context.cacheDir, name)
        FileOutputStream(file).use { output ->
            input.copyTo(output)
        }
        input.close()
        return file
    }
}
