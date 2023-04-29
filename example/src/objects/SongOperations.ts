import { reExtractSongName, extractParenthesis } from '../utils/re';
import SongInterface from './SongInterface';

interface SongProps {
  cid: string | number;
  bvid: string;
  name: string;
  nameRaw: string;
  singer: string;
  singerId: string | number;
  cover: string;
  lyric: string | undefined;
  lyricOffset: number | undefined;
  page: number | undefined;
  biliShazamedName: string | undefined;
}

export default ({
  cid,
  bvid,
  name,
  singer,
  cover,
  singerId,
  lyric,
  lyricOffset,
  page,
  biliShazamedName,
}: SongProps): SongInterface => {
  return {
    id: String(cid),
    bvid,
    name,
    singer,
    cover,
    singerId,
    lyric,
    lyricOffset,
    page,
    biliShazamedName,
    nameRaw: name,
    parsedName: reExtractSongName(name, singerId),
  };
};

export const setSongBiliShazamed = (song: SongInterface, val: string) => {
  song.biliShazamedName = val;
  if (!val) return;
  song.biliShazamedName = extractParenthesis(val);
  song.nameRaw = song.name;
  song.name = song.biliShazamedName;
  song.parsedName = song.biliShazamedName;
};

export const removeSongBiliShazamed = (song: SongInterface) => {
  song.biliShazamedName = undefined;
  song.name = song.nameRaw;
  song.parsedName = reExtractSongName(song.name, song.singerId);
};
