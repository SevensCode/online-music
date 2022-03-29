import React, { FC } from 'react';
import Play from './Play';
import Loading from './Loading';
import Playing from './Playing';
import { useRecoilValue } from 'recoil';
import { atom_audio_musicDetails, atom_auido_status } from '@/recoil/audio';

interface Props {
    className?: string;
    id: number;
    onPlay?: () => void;
    onPaused?: () => void;
}

const AudioStatus: FC<Props> = ({ id, className, onPlay, onPaused }) => {
    const audioStatus = useRecoilValue(atom_auido_status);
    const musicDetails = useRecoilValue(atom_audio_musicDetails);
    if (musicDetails === null)
        return <Play onClick={onPlay} className={className} />;
    if (audioStatus === 1 && id === musicDetails.id) {
        return <Loading className={className} />;
    } else if (audioStatus === 2 && id === musicDetails.id) {
        return <Playing onClick={onPaused} className={className} />;
    } else {
        return <Play onClick={onPlay} className={className} />;
    }
};

export default AudioStatus;
