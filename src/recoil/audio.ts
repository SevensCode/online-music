import { atom } from 'recoil';
import { MusicDetails } from '@/recoil/types/audio';
// 播放类型
export const atom_audio_playType = atom<number>({
    key: 'atom_audio_playType',
    default: 0,
});

// 音频实例
export const atom_audio_instance = atom({
    key: 'atom_audio_instance',
    default: new Audio(),
});

// 音乐详情
export const atom_audio_musicDetails = atom<Nullable<MusicDetails>>({
    key: 'atom_audio_musicDetails',
    default: null,
});

// 音乐状态
export const atom_auido_status = atom<number>({
    key: 'atom_auido_status',
    default: 0, // 0未播 1加载中 2播放中 3 暂停中
});

// 进度条是否被拖动
export const atom_audio_isDragProgressBar = atom<boolean>({
    key: 'atom_audio_isDragProgressBar',
    default: false,
});

// 进度条值
export const atom_audio_progressBarValue = atom<number>({
    key: 'atom_audio_progressBarValue',
    default: 0,
});
