import { atom } from 'recoil';
import { MusicDetails, MusicLyricsArr, MusicTime } from '@/recoil/types/audio';

// 播放类型
export const audio_playType = atom<number>({
    key: 'audio_playType',
    default: 0,
});

// 音频实例
export const audio_instance = atom({
    key: 'audio_instance',
    default: new Audio(),
});

// 音乐详情
export const audio_musicDetails = atom<Nullable<MusicDetails>>({
    key: 'audio_musicDetails',
    default: null,
});

// 音乐状态
export const auido_status = atom<number>({
    key: 'auido_status',
    default: 0, // 0未播 1加载中 2播放中 3 暂停中
});

// 进度条是否被拖动
export const audio_isDragProgressBar = atom<boolean>({
    key: 'audio_isDragProgressBar',
    default: false,
});

// 进度条值
export const audio_progressBarValue = atom<number>({
    key: 'audio_progressBarValue',
    default: 0,
});

// 播放总时间
export const audio_totalPlayTime = atom<MusicTime>({
    key: 'audio_totalPlayTime',
    default: { minute: 0, second: 0 },
});

// 播放进度时间
export const audio_playProgressTime = atom<MusicTime>({
    key: 'audio_playProgressTime',
    default: { minute: 0, second: 0 },
});

// 歌词视图是否显示
export const audio_isLyricsView = atom<boolean>({
    key: 'audio_isLyricsView',
    default: false,
});

// 歌词
export const audio_lyrics = atom<MusicLyricsArr>({
    key: 'audio_lyrics',
    default: [],
});
