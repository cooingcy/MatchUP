package com.matchup.app.data.cloudinary

import android.content.Context
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.MultipartBody
import java.io.File
import com.matchup.app.utils.ImageUtils
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST

/**
 * CloudinaryRepository
 * - uploadFile(File) -> retorna URL (secure_url)
 * - uploadUri(Context, Uri) -> converte e usa uploadFile
 * - deleteImage(publicId, backendBaseUrl) -> chama seu endpoint backend (/api/deleteImage)
 *
 * Observação: para deletar imagens recomendo usar seu backend (Next.js) que contém as credenciais.
 */
class CloudinaryRepository {

    suspend fun uploadFile(file: File, preset: String = "MatchUPP"): String {
        val reqFile = file.asRequestBody("image/*".toMediaTypeOrNull())
        val part = MultipartBody.Part.createFormData("file", file.name, reqFile)
        val presetBody = RequestBody.create("text/plain".toMediaTypeOrNull(), preset)
        val res = CloudinaryService.api.upload(part, presetBody)
        return res.secure_url
    }

    // Convenience: upload a partir de Uri (usa ImageUtils.uriToFile)
    suspend fun uploadUri(context: Context, uri: android.net.Uri, preset: String = "MatchUPP"): String {
        val tmp = ImageUtils.uriToFile(context, uri, name = "upload_${System.currentTimeMillis()}.jpg")
        val url = uploadFile(tmp, preset)
        // opcional: delete tmp file
        try { tmp.delete() } catch (_: Exception) {}
        return url
    }

    /**
     * Delete image via backend endpoint.
     * Não inclua chaves Cloudinary no app — use o backend (Next.js).
     *
     * Exemplo de payload: { "publicId": "abc123" }
     *
     * backendBaseUrl: ex. "https://seu-dominio.com"
     */
    suspend fun deleteImageViaBackend(backendBaseUrl: String, publicId: String): Boolean {
        val api = BackendDeleteService.create(backendBaseUrl)
        val resp = api.deleteImage(DeleteRequest(publicId))
        return resp.success
    }

    // --- Retrofit small interface for backend delete endpoint ---
    interface BackendDeleteServiceApi {
        @POST("/api/deleteImage")
        suspend fun deleteImage(@Body req: DeleteRequest): DeleteResponse
    }

    data class DeleteRequest(val publicId: String)
    data class DeleteResponse(val success: Boolean)

    private object BackendDeleteService {
        fun create(baseUrl: String): BackendDeleteServiceApi {
            val retrofit = Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            return retrofit.create(BackendDeleteServiceApi::class.java)
        }
    }
}
