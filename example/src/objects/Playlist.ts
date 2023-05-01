import { Track } from 'react-native-track-player';
import { v4 as uuidv4 } from 'uuid';
import Song from './SongInterface';
import { resolveUrl, NULL_TRACK } from './SongOperations';

export default interface Playlist {
  songList: Array<Song>;
  title: string;
  id: string;
  subscribeUrl: Array<string>;
  blacklistedUrl: Array<string>;
  useBiliShazam: boolean;
}

export const dummyPlaylist = (title = 'Search'): Playlist => {
  return {
    songList: [],
    title,
    id: uuidv4(),
    subscribeUrl: [],
    blacklistedUrl: [],
    useBiliShazam: false,
  };
};

export const playlistToTracklist = async (
  playlist: Playlist,
  resolveIndex = -1
): Promise<Track[]> => {
  const result = [];
  for (let i = 0, n = playlist.songList.length; i < n; i++) {
    // const url = i === resolveIndex ? await resolveUrl(playlist.songList[i]) :
    result.push({
      ...NULL_TRACK,
      title: playlist.songList[i].parsedName,
      artist: playlist.songList[i].singer,
      artwork: playlist.songList[i].cover,
      duration: playlist.songList[i].duration,
      song: playlist.songList[i],
    });
  }
  return result;
};
