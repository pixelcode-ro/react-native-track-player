package com.doublesymmetry.trackplayer.service

import android.os.Bundle
import android.support.v4.media.MediaBrowserCompat
import androidx.annotation.MainThread
import androidx.media.MediaBrowserServiceCompat
@MainThread
class MusicBrowserService : MediaBrowserServiceCompat() {

    override fun onGetRoot(
            clientPackageName: String,
            clientUid: Int,
            rootHints: Bundle?
    ): MediaBrowserServiceCompat.BrowserRoot {
        return MediaBrowserServiceCompat.BrowserRoot("/", null)
    }

    override fun onLoadChildren(
            parentMediaId: String,
            result: MediaBrowserServiceCompat.Result<List<MediaBrowserCompat.MediaItem>>
    ) {
        //  Browsing not allowed
        if ("MY_EMPTY_MEDIA_ROOT_ID" == parentMediaId) {
            result.sendResult(null)
            return
        }

        // Assume for example that the music catalog is already loaded/cached.

        val mediaItems = emptyList<MediaBrowserCompat.MediaItem>()

        // Check if this is the root menu:
        if ("MY_MEDIA_ROOT_ID" == parentMediaId) {
            // Build the MediaItem objects for the top level,
            // and put them in the mediaItems list...
        } else {
            // Examine the passed parentMediaId to see which submenu we're at,
            // and put the children of that menu in the mediaItems list...
        }
        result.sendResult(mediaItems)
    }

}
