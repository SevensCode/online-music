import React, { FC, useCallback } from 'react';
import { Slider } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    atom_audio_instance,
    atom_audio_isDragProgressBar,
    atom_audio_musicDetails,
    atom_audio_playbackProgress,
    atom_audio_progressBarValue,
} from '@/recoil/audio';

const AudioProgressBar: FC<{ className?: string }> = ({ className }) => {
    const musicDetails = useRecoilValue(atom_audio_musicDetails);
    // 进度条是否被拖动
    const setIsDragProgressBar = useSetRecoilState(
        atom_audio_isDragProgressBar,
    );
    const [playbackProgress, setPlaybackProgress] = useRecoilState(
        atom_audio_playbackProgress,
    );

    const audio = useRecoilValue(atom_audio_instance);
    const [progressBarValue, setProgressBarValue] = useRecoilState(
        atom_audio_progressBarValue,
    );

    const onChange = useCallback((value) => {
        // 改拖拽为 true
        setIsDragProgressBar(true);
        // 更新进度条
        setProgressBarValue(value);
    }, []);
    const onAfterChange = useCallback((value) => {
        // 更新audio播放时间
        audio.currentTime = value;
        // 改拖拽为 false
        setIsDragProgressBar(false);
    }, []);
    const tipFormatter = useCallback((value) => {
        console.log(value);
        return value;
        // return `${ zeroPadding(minute) }:${ zeroPadding(second) }`
    }, []);

    return (
        <Slider
            onChange={onChange}
            onAfterChange={onAfterChange}
            className={[className, 'progressBar'].join(' ')}
            step={1}
            tipFormatter={tipFormatter}
            min={0}
            max={musicDetails ? Math.round(musicDetails.duration / 1000) : 0}
            value={progressBarValue}
            defaultValue={0}
        />
    );
};

export default AudioProgressBar;
