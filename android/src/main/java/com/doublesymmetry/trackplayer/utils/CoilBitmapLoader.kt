package com.doublesymmetry.trackplayer.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.net.Uri
import android.os.Build
import androidx.media3.common.util.BitmapLoader
import androidx.media3.common.util.Util.isBitmapFactorySupportedMimeType
import androidx.media3.common.util.UnstableApi
import coil.ImageLoader
import coil.request.ImageRequest
import com.lovegaoshi.kotlinaudio.utils.getEmbeddedBitmap
import com.google.common.util.concurrent.ListenableFuture
import jp.wasabeef.transformers.coil.CropSquareTransformation
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.guava.future
import java.io.IOException
import javax.inject.Inject

// https://github.com/androidx/media/issues/121

@UnstableApi
class CoilBitmapLoader @Inject constructor(
    private val context: Context,
    private val cropSquare: Boolean = false,
) : BitmapLoader {

    private val scope = MainScope()
    private val imageLoader = ImageLoader(context)

    override fun supportsMimeType(mimeType: String): Boolean {
        return isBitmapFactorySupportedMimeType(mimeType)
    }

    override fun decodeBitmap(data: ByteArray): ListenableFuture<Bitmap> {
        val bitmap = BitmapFactory.decodeByteArray(data,  /* offset= */0, data.size)
        return scope.future {
            bitmap ?: throw IOException("Unable to decode bitmap")
        }
    }

    override fun loadBitmap(uri: Uri): ListenableFuture<Bitmap> = scope.future {
        val bitmap: Bitmap?
        val parsedUri = uri.toString()
        if (parsedUri.startsWith("file://")) {
            bitmap = getEmbeddedBitmap(parsedUri.substring(7))
        } else {
            var imgrequest = ImageRequest.Builder(context)
                .data(uri)
                .allowHardware(false)
            // HACK: header implementation should be done via parsed data from uri

            if (Build.MANUFACTURER == "samsung" || cropSquare) {
                imgrequest = imgrequest.transformations(CropSquareTransformation())
            }
            val response = imageLoader.execute(imgrequest.build())
            bitmap = (response.drawable as? BitmapDrawable)?.bitmap

        }
        bitmap ?: Bitmap.createBitmap(1, 1, Bitmap.Config.RGB_565)

    }
}
