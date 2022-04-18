import { atom } from 'recoil';
import { MusicDetail, MusicLyricsArr } from '@/recoil/types/music';
import { SongList } from '@/recoil/types/songList';

// 音乐详情
export const music_detail = atom<Nullable<MusicDetail>>({
    key: 'music_detail',
    default: null,
});

// 歌词
export const music_lyrics = atom<MusicLyricsArr>({
    key: 'music_lyrics',
    default: [],
});
// 歌单
export const music_songList = atom<Nullable<SongList>>({
    key: 'music_songList',
    default: null,
});
