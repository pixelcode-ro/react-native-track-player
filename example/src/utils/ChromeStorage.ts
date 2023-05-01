import AsyncStorage from '@react-native-async-storage/async-storage';
import Playlist from '../objects/Playlist';
// see known storage limits: https://react-native-async-storage.github.io/async-storage/docs/limits
const MAX_SONGLIST_SIZE = 400;

enum STORAGE_KEYS {
  PLAYER_SETTING_KEY = 'PlayerSetting',
  FAVORITE_PLAYLIST_KEY = 'FavFavList-Special',
  SEARCH_PLAYLIST_KEY = 'SearchPlaylist-Special',
  CURRENT_PLAYING = 'CurrentPlaying',
  LAST_PLAY_LIST = 'LastPlayList',
  FAVLIST_AUTO_UPDATE_TIMESTAMP = 'favListAutoUpdateTimestamp',
  MY_FAV_LIST_KEY = 'MyFavList',
}

export const EXPORT_OPTIONS = {
  local: '本地',
  dropbox: 'Dropbox',
  personal: '私有云',
};

export interface PlayerSettingDict {
  autoRSSUpdate: boolean;
  skin: string;
  parseSongName: boolean;
  keepSearchedSongListWhenPlaying: boolean;
  settingExportLocation: string;
  personalCloudIP: string;
  noxVersion: string;
  hideCoverInMobile: boolean;
  loadPlaylistAsArtist: boolean;
  sendBiliHeartbeat: boolean;
  noCookieBiliSearch: boolean;
  [key: string]: any;
}

export interface PlayerStorageObject {
  settings: PlayerSettingDict;
  currentPlayingId: string;
  playlistIds: Array<string>;
  playlists: { [key: string]: Playlist };
}

const DEFAULT_SETTING: PlayerSettingDict = {
  autoRSSUpdate: false,
  skin: '诺莺nox',
  parseSongName: false,
  keepSearchedSongListWhenPlaying: false,
  settingExportLocation: EXPORT_OPTIONS.local,
  personalCloudIP: '',
  noxVersion: 'latest',
  hideCoverInMobile: false,
  loadPlaylistAsArtist: false,
  sendBiliHeartbeat: false,
  noCookieBiliSearch: false,
};

export const saveItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const getItem = async (key: string): Promise<null | any> => {
  try {
    const retrievedStr = await AsyncStorage.getItem(key);
    return retrievedStr === null ? null : JSON.parse(retrievedStr);
  } catch (e) {
    console.error(e);
  }
  return null;
};

const chunkArray = (
  arr: Array<any>,
  size = MAX_SONGLIST_SIZE
): Array<any[]> => {
  return arr.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
};
/**
 * see known storage limits: https://react-native-async-storage.github.io/async-storage/docs/limits
 * playlist can get quite large, my idea is to splice songlist into smaller lists then join them.
 * @param playlist
 * @returns
 */
export const savePlaylist = async (playlist: Playlist) => {
  try {
    // splice into chunks
    const splicedSonglists = chunkArray(playlist.songList);
    const savingPlaylist = {
      ...playlist,
      songList: splicedSonglists.map((val, index) => `${playlist.id}.${index}`),
    };
    // save chunks
    saveItem(playlist.id, savingPlaylist);
    splicedSonglists.forEach((list, index) =>
      saveItem(savingPlaylist.songList[index], list)
    );
  } catch (e) {
    console.error(e);
  }
};

export const getPlaylist = async (key: string): Promise<null | any> => {
  try {
    // eslint-disable-next-line prefer-const
    let retrievedPlaylist = await getItem(key);
    if (retrievedPlaylist === null) return null;
    retrievedPlaylist.songList = await Promise.all(
      retrievedPlaylist.songList.map((val: string) => getItem(val))
    );
    return retrievedPlaylist;
  } catch (e) {
    console.error(e);
  }
  return null;
};

export const initPlayer = async (): Promise<PlayerStorageObject> => {
  let playerObject = {};
  return playerObject;
};
