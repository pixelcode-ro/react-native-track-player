import { create } from 'zustand';

interface NoxSetting {
  currentPlayingId: string | null;
  setCurrentPlayingId: (val: string) => void;
  playlists: Array<{ id: string; name: string }>;
  currentPlaylist: object;
}

export const useNoxSetting = create<NoxSetting>(set => ({
  currentPlayingId: null,
  setCurrentPlayingId: (val: string) => set({ currentPlayingId: val }),
  playlists: [],
  currentPlaylist: {},
}));
