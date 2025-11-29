package com.matchup.app.data.cloudinary

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface CloudinaryApi {
    @Multipart
    @POST("v1_1/matchupp/image/upload")
    suspend fun upload(
        @Part file: MultipartBody.Part,
        @Part("upload_preset") preset: RequestBody
    ): CloudinaryResponse
}

data class CloudinaryResponse(val secure_url: String)
