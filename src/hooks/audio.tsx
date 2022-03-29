import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    atom_audio_instance,
    atom_audio_isDragProgressBar,
    atom_audio_musicDetails,
    atom_audio_playbackProgress,
    atom_audio_progressBarValue,
    atom_auido_status,
} from '@/recoil/audio';
import { useCallback } from 'react';
import { MusicDetails } from '@/recoil/types/audio';

// 音频播放器
export const useAudioPlay = () => {
    const audio = useRecoilValue(atom_audio_instance);
    // 音乐详情
    const setMusicDetails = useSetRecoilState(atom_audio_musicDetails);
    // 播放器状态
    const setAudioStatus = useSetRecoilState(atom_auido_status);
    // 音乐播放进度
    const setPlaybackProgress = useSetRecoilState(atom_audio_playbackProgress);
    // 进度条的值
    const setProgressBarValue = useSetRecoilState(atom_audio_progressBarValue);
    // 进度条是否被拖动
    const isDragProgressBar = useRecoilValue(atom_audio_isDragProgressBar);
    return useCallback((musicDetails?: MusicDetails) => {
        if (musicDetails ?? musicDetails) {
            setMusicDetails(musicDetails);
            audio.src = `https://music.163.com/song/media/outer/url?id=${musicDetails.id}.mp3`;
        }
        if (isDragProgressBar) return false;
        setAudioStatus(1);
        audio.play().then((r) => setAudioStatus(2));
        audio.addEventListener('timeupdate', () => {
            // 当前秒
            const currentSeconds = Math.floor(audio.currentTime);
            // 分
            const minute = Math.floor(currentSeconds / 60);
            // 秒
            const second = currentSeconds % 60;
            // 更新播放时间
            setPlaybackProgress({ minute, second });
            // 更新进度条
            setProgressBarValue(currentSeconds);
        });
    }, []);
};

export const useAudioPause = () => {
    const audio = useRecoilValue(atom_audio_instance);
    const setMusicStatus = useSetRecoilState(atom_auido_status);
    return useCallback(() => {
        audio.pause();
        setMusicStatus(3);
    }, []);
};
