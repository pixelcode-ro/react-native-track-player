import Song from './SongInterface';
import { v4 as uuidv4 } from 'uuid';

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
