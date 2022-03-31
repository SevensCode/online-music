import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    atom_audio_instance,
    atom_audio_isDragProgressBar,
    atom_audio_musicDetails,
    atom_audio_progressBarValue,
    atom_auido_status,
} from '@/recoil/audio';
import { useCallback, useEffect, useRef } from 'react';
import { MusicDetails } from '@/recoil/types/audio';

// 音频播放器
export const useAudioPlay = () => {
    const audio = useRecoilValue(atom_audio_instance);
    // 音乐详情
    const setMusicDetails = useSetRecoilState(atom_audio_musicDetails);
    // 播放器状态
    const setAudioStatus = useSetRecoilState(atom_auido_status);
    // 进度条的值
    const setProgressBarValue = useSetRecoilState(atom_audio_progressBarValue);
    // 进度条是否被拖动
    const isDragProgressBar = useRecoilValue(atom_audio_isDragProgressBar);
    const isDragProgressBarRef = useRef<boolean>(isDragProgressBar);
    useEffect(() => {
        isDragProgressBarRef.current = isDragProgressBar;
    }, [isDragProgressBar]);
    const renew = useCallback(() => {
        if (isDragProgressBarRef.current) return false;
        // 更新进度条
        setProgressBarValue(Math.floor(audio.currentTime));
    }, [isDragProgressBarRef]);
    return (musicDetails?: MusicDetails) => {
        if (musicDetails ?? musicDetails) {
            setMusicDetails(musicDetails);
            audio.src = `https://music.163.com/song/media/outer/url?id=${musicDetails.id}.mp3`;
        }
        setAudioStatus(1);
        audio.play().then((r) => setAudioStatus(2));
        audio.addEventListener('timeupdate', renew);
        audio.addEventListener('ended', () => setAudioStatus(0));
    };
};

export const useAudioPause = () => {
    const audio = useRecoilValue(atom_audio_instance);
    const setMusicStatus = useSetRecoilState(atom_auido_status);
    return useCallback(() => {
        audio.pause();
        setMusicStatus(3);
    }, []);
};
