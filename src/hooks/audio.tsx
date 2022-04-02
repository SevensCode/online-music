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
import { MusicDetails } from '@/recoil/types/audio';
import { millisecondTurnTime, secondTurnTime } from '@/utils';
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
        console.log(lrc.lyric.split('\n').length);
        console.log(tlyric.lyric.split(/\[.*?]/).length);
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
    return async (musicDetails?: MusicDetails) => {
        if (musicDetails ?? musicDetails) await setMusicInfo(musicDetails);
        setAudioStatus(1);
        audio.play().then((r) => setAudioStatus(2));
    };
};

export const useAudioPause = () => {
    const audio = useRecoilValue(audio_instance);
    const setMusicStatus = useSetRecoilState(auido_status);
    return useCallback(() => {
        audio.pause();
        setMusicStatus(3);
    }, []);
};

// 格式化歌词方法
function parseLyric(lrc) {
    let lyrics = lrc.split('\n');
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g;
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i;
    // 3.定义正则表达式提取 :00
    let reg3 = /\:\d*/i;
    // 4.定义对象保存处理好的歌词
    let lyricObj = {};
    lyrics.forEach(function (lyric) {
        // 1.提取时间
        let timeStr = lyric.match(reg1);
        if (!timeStr) {
            return;
        }
        timeStr = timeStr[0];
        // 2.提取分钟
        let minStr = timeStr.match(reg2)[0].substr(1);
        // 3.提取秒钟
        let secondStr = timeStr.match(reg3)[0].substr(1);
        // 4.合并时间, 将分钟和秒钟都合并为秒钟
        let time = parseInt(minStr) * 60 + parseInt(secondStr);
        // 5.处理歌词
        let text = lyric.replace(reg1, '').trim();
        // 6.保存数据
        lyricObj[time] = text;
    });
    // console.log(lyricObj);
    return lyricObj;
}
