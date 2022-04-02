import React, { FC } from 'react';
import AudioStatusPlay from './Play';
import AudioStatusLoading from './Loading';
import AudioStatusPlaying from './Playing';
import { useRecoilValue } from 'recoil';
import { audio_musicDetails, auido_status } from '@/recoil/audio';

interface Props {
    className?: string;
    id: number;
    onPlay?: () => void;
    onPaused?: () => void;
}

const AudioStatus: FC<Props> = ({ id, className, onPlay, onPaused }) => {
    const audioStatus = useRecoilValue(auido_status);
    const musicDetails = useRecoilValue(audio_musicDetails);
    if (musicDetails === null)
        return <AudioStatusPlay onClick={onPlay} className={className} />;
    if (audioStatus === 1 && id === musicDetails.id) {
        return <AudioStatusLoading className={className} />;
    } else if (audioStatus === 2 && id === musicDetails.id) {
        return <AudioStatusPlaying onClick={onPaused} className={className} />;
    } else {
        return <AudioStatusPlay onClick={onPlay} className={className} />;
    }
};

export default AudioStatus;
