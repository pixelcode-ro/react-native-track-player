export default interface Song {
  id: string | number;
  bvid: string;
  name: string;
  nameRaw: string;
  singer: string;
  singerId: string | number;
  cover: string;
  lyric: string;
  lyricOffset: number;
  parsedName: string;
  biliShazamedName: string | undefined;
  page: number | undefined;
}
