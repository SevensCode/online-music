import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    audio_instance,
    audio_isDragProgressBar,
    audio_lyrics,
    audio_musicDetails,
    audio_playProgressTime,
    audio_progressBarValue,
    audio_totalPlayTime,
    auido_status,
} from '@/recoil/audio';
import { useCallback, useEffect, useRef } from 'react';
import { MusicDetails, MusicLyrics } from '@/recoil/types/audio';
import { millisecondTurnTime, parseLyric, secondTurnTime } from '@/utils';
import { MusicRequest } from '@/api/music';
import { message } from 'antd';

// 音频播放器
export const useAudioPlay = () => {
    const audio = useRecoilValue(audio_instance);
    // 音乐详情
    const setMusicDetails = useSetRecoilState(audio_musicDetails);
    // 播放器状态
    const setAudioStatus = useSetRecoilState(auido_status);
    // 进度条的值
    const setProgressBarValue = useSetRecoilState(audio_progressBarValue);
    // 音乐总时间
    const setTotalPlayTime = useSetRecoilState(audio_totalPlayTime);
    // 播放进度时间
    const stePlayProgressTime = useSetRecoilState(audio_playProgressTime);
    // 进度条是否被拖动
    const isDragProgressBar = useRecoilValue(audio_isDragProgressBar);
    const isDragProgressBarRef = useRef<boolean>(isDragProgressBar);
    // 获取歌词
    const setLyrics = useSetRecoilState(audio_lyrics);
    useEffect(() => {
        isDragProgressBarRef.current = isDragProgressBar;
    }, [isDragProgressBar]);
    // 播放中
    const timeupdate = useCallback(() => {
        if (isDragProgressBarRef.current) return false;
        const currentTime = Math.floor(audio.currentTime);
        // 更新进度条
        setProgressBarValue(currentTime);
        // 更新播放时间
        stePlayProgressTime(secondTurnTime(currentTime));
    }, [isDragProgressBarRef]);
    // 播放完成
    const ended = useCallback(() => {
        setAudioStatus(0);
    }, []);
    // 加载错误
    const error = useCallback(() => {
        message.error('音乐播放失败！');
    }, []);

    // 设置音乐信息
    const setMusicInfo = useCallback(async (musicDetails) => {
        setMusicDetails(musicDetails);
        setTotalPlayTime(millisecondTurnTime(musicDetails.duration));
        audio.src = `https://music.163.com/song/media/outer/url?id=${musicDetails.id}.mp3`;
        const { code, lrc, tlyric } = await MusicRequest.getLyrics(
            musicDetails.id,
        );
        if (code !== 200) return false;
        const lyrics = parseLyric(lrc.lyric, tlyric.lyric);
        const lyricArr = Object.keys(lyrics).map((key): MusicLyrics => {
            const { lyric, zhLyric } = lyrics[key];
            return { time: Number(key), lyric, zhLyric };
        });
        setLyrics(lyricArr);
    }, []);

    useEffect(() => {
        audio.addEventListener('error', error);
        audio.addEventListener('timeupdate', timeupdate);
        audio.addEventListener('ended', ended);
        return () => {
            audio.removeEventListener('error', error);
            audio.removeEventListener('timeupdate', timeupdate);
            audio.removeEventListener('ended', ended);
        };
    }, []);
    return (musicDetails?: MusicDetails) => {
        if (musicDetails ?? musicDetails) setMusicInfo(musicDetails);
        setAudioStatus(1);
        audio.play().then((r) => setAudioStatus(2));
    };
};

export const useAudioPause = () => {
    const audio = useRecoilValue(audio_instance);
    const setMusicStatus = useSetRecoilState(auido_status);
    return useCallback(() => {
        audio.pause();
        setMusicStatus(0);
    }, []);
};
