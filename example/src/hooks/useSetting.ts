import { create } from 'zustand';
import Playlist, { dummyPlaylist } from '../objects/Playlist';
import { NoxRepeatMode } from '../components/player/enums/repeatMode';
import { DEFAULT_SETTING, PlayerStorageObject } from '../utils/ChromeStorage';
import { notNullDefault } from '../utils/Utils';
import { PlayerSettingDict } from '../utils/ChromeStorage';

interface NoxSetting {
  currentPlayingId: string | null;
  setCurrentPlayingId: (val: string) => void;
  playlists: { [key: string]: Playlist };
  playlistIds: Array<string>;
  setPlaylistIds: (val: Array<string>) => void;

  currentPlaylist: Playlist;
  setCurrentPlaylist: (val: Playlist) => void;
  searchPlaylist: Playlist;
  setSearchPlaylist: (val: Playlist) => void;
  favoritePlaylist: Playlist;
  setFavoritePlaylist: (val: Playlist) => void;
  currentPlayingPlaylistId: string;
  setCurrentPlayingPlaylistId: (val: string) => void;

  playerRepeat: string;
  setPlayerRepeat: (val: string) => void;
  playerSetting: PlayerSettingDict;
  setPlayerSetting: (val: PlayerSettingDict) => void;
  initPlayer: (val: PlayerStorageObject) => Promise<void>;
}

export const useNoxSetting = create<NoxSetting>(set => ({
  currentPlayingId: null,
  setCurrentPlayingId: (val: string) => set({ currentPlayingId: val }),
  playlists: {},
  playlistIds: [],
  setPlaylistIds: (val: Array<string>) => set({ playlistIds: val }),

  currentPlaylist: dummyPlaylist(),
  setCurrentPlaylist: (val: Playlist) => set({ currentPlaylist: val }),
  searchPlaylist: dummyPlaylist(),
  setSearchPlaylist: (val: Playlist) => set({ searchPlaylist: val }),
  favoritePlaylist: dummyPlaylist(),
  setFavoritePlaylist: (val: Playlist) => set({ favoritePlaylist: val }),
  currentPlayingPlaylistId: '',
  setCurrentPlayingPlaylistId: (val: string) =>
    set({ currentPlayingPlaylistId: val }),

  playerRepeat: NoxRepeatMode.SHUFFLE,
  setPlayerRepeat: (val: string) => set({ playerRepeat: val }),
  playerSetting: DEFAULT_SETTING,
  setPlayerSetting: (val: PlayerSettingDict) => set({ playerSetting: val }),

  initPlayer: async (val: PlayerStorageObject) => {
    console.log('initplayer');
    set({ currentPlayingId: val.lastPlaylistId[1] });
    set({
      currentPlaylist: notNullDefault(
        val.playlists[val.lastPlaylistId[0]],
        dummyPlaylist()
      ),
    });
    set({ favoritePlaylist: val.favoriPlaylist });
    set({ currentPlayingPlaylistId: val.lastPlaylistId[0] });
    set({ playerSetting: val.settings ? val.settings : DEFAULT_SETTING });
    set({ playerRepeat: val.playerRepeat });
    set({ playlists: val.playlists });
    set({ playlistIds: val.playlistIds });
  },

  addPlaylist: () => {},
  removePlaylist: () => {},
  updatePlaylist: () => {},
}));
