/* eslint-disable prefer-const */
import { create } from 'zustand';
import Playlist, { dummyPlaylist } from '../objects/Playlist';
import { NoxRepeatMode } from '../components/player/enums/repeatMode';
import {
  DEFAULT_SETTING,
  PlayerStorageObject,
  removePlaylist,
  savePlaylist,
  savePlaylistIds,
} from '../utils/ChromeStorage';
import { notNullDefault } from '../utils/Utils';
import { PlayerSettingDict } from '../utils/ChromeStorage';

interface NoxSetting {
  currentPlayingId: string | null;
  setCurrentPlayingId: (val: string) => void;
  playlists: { [key: string]: Playlist };
  playlistIds: Array<string>;

  currentPlaylist: Playlist;
  setCurrentPlaylist: (val: Playlist) => void;
  searchPlaylist: Playlist;
  setSearchPlaylist: (val: Playlist) => void;
  favoritePlaylist: Playlist;
  setFavoritePlaylist: (val: Playlist) => void;

  playerRepeat: string;
  setPlayerRepeat: (val: string) => void;
  playerSetting: PlayerSettingDict;
  setPlayerSetting: (val: PlayerSettingDict) => void;

  newPlaylistWindowVisible: boolean;
  setNewPlaylistWindowVisible: (val: boolean) => void;

  addPlaylist: (val: Playlist) => void;
  removePlaylist: (val: Playlist) => void;
  updatePlaylist: (val: Playlist) => void;

  initPlayer: (val: PlayerStorageObject) => Promise<void>;
}

export const useNoxSetting = create<NoxSetting>((set, get) => ({
  currentPlayingId: null,
  setCurrentPlayingId: (val: string) => set({ currentPlayingId: val }),
  playlists: {},
  playlistIds: [],

  currentPlaylist: dummyPlaylist(),
  setCurrentPlaylist: (val: Playlist) => set({ currentPlaylist: val }),
  searchPlaylist: dummyPlaylist(),
  setSearchPlaylist: (val: Playlist) => set({ searchPlaylist: val }),
  favoritePlaylist: dummyPlaylist(),
  setFavoritePlaylist: (val: Playlist) => set({ favoritePlaylist: val }),

  playerRepeat: NoxRepeatMode.SHUFFLE,
  setPlayerRepeat: (val: string) => set({ playerRepeat: val }),
  playerSetting: DEFAULT_SETTING,
  setPlayerSetting: (val: PlayerSettingDict) => set({ playerSetting: val }),

  newPlaylistWindowVisible: false,
  setNewPlaylistWindowVisible: (val: boolean) =>
    set({ newPlaylistWindowVisible: val }),

  addPlaylist: (playlist: Playlist) => {
    let playlistIds = get().playlistIds;
    let playlists = get().playlists;
    playlistIds.push(playlist.id);
    playlists[playlist.id] = playlist;
    set({ playlists, playlistIds });
    savePlaylist(playlist);
    savePlaylistIds(playlistIds);
  },
  removePlaylist: (playlist: Playlist) => {
    let playlistIds = get().playlistIds;
    let playlists = get().playlists;
    delete playlists[playlist.id];
    removePlaylist(playlist, playlistIds).then(() =>
      set({ playlists, playlistIds })
    );
  },
  updatePlaylist: (playlist: Playlist) => {
    let playlists = get().playlists;
    playlists[playlist.id] = playlist;
    set({ playlists });
    savePlaylist(playlist);
  },

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
    set({ playerSetting: val.settings ? val.settings : DEFAULT_SETTING });
    set({ playerRepeat: val.playerRepeat });
    set({ playlists: val.playlists });
    set({ playlistIds: val.playlistIds });
  },
}));
