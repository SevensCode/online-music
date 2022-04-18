import React, { FC } from 'react';
import AudioStatusPlay from './Play';
import AudioStatusLoading from './Loading';
import AudioStatusPlaying from './Playing';
import { useRecoilValue } from 'recoil';
import { auido_status } from '@/recoil/audio';
import { music_detail } from '@/recoil/muisc';

interface Props {
    className?: string;
    id: number;
    onPlay?: () => void;
    onPaused?: () => void;
}

const AudioStatus: FC<Props> = ({ id, className, onPlay, onPaused }) => {
    const audioStatus = useRecoilValue(auido_status);
    const musicDetail = useRecoilValue(music_detail);
    if (musicDetail === null)
        return <AudioStatusPlay onClick={onPlay} className={className} />;
    if (audioStatus === 1 && id === musicDetail.id) {
        return <AudioStatusLoading className={className} />;
    } else if (audioStatus === 2 && id === musicDetail.id) {
        return <AudioStatusPlaying onClick={onPaused} className={className} />;
    } else {
        return <AudioStatusPlay onClick={onPlay} className={className} />;
    }
};

export default AudioStatus;
