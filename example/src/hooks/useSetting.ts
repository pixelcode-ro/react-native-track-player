import { create } from 'zustand';
import Playlist, { dummyPlaylist } from '../objects/Playlist';
import { NoxRepeatMode } from '../components/player/enums/repeatMode';

interface NoxSetting {
  currentPlayingId: string | null;
  setCurrentPlayingId: (val: string) => void;
  playlists: Array<{ id: string; name: string }>;

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
}

export const useNoxSetting = create<NoxSetting>(set => ({
  currentPlayingId: null,
  setCurrentPlayingId: (val: string) => set({ currentPlayingId: val }),
  playlists: [],

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
}));
