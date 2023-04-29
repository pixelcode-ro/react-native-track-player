export default interface Song {
  id: string | number;
  bvid: string;
  name: string;
  nameRaw: string;
  singer: string;
  singerId: string | number;
  cover: string;
  lyric: string | undefined;
  lyricOffset: number | undefined;
  parsedName: string;
  biliShazamedName: string | undefined;
  page: number | undefined;
}
