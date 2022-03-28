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

export const atom_audio_musicDetails = atom<Nullable<MusicDetails>>({
    key: 'atom_audio_musicDetails',
    default: null,
});
