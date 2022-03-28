import { useRecoilValue } from 'recoil';
import { atom_audio_instance } from '@/recoil/audio';

// 音频播放器
export const useAudio = () => {
    const audio = useRecoilValue(atom_audio_instance);

    return [];
};
