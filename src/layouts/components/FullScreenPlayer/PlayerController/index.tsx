import React from 'react';
import ImageLazy from '@/components/ImageLazy';
import AuthorTags from '@/components/AuthorTags';
import Like from '@/components/Like';
import AudioProgressBar from '@/components/Audio/ProgressBar';
import AudioController from '@/components/Audio/Controller';
import { useRecoilValue } from 'recoil';
import {
    audio_musicDetails,
    audio_playProgressTime,
    audio_totalPlayTime,
} from '@/recoil/audio';
import './index.less';
import { MusicDetails } from '@/recoil/types/audio';

const PlayerController = () => {
    const musicDetails = useRecoilValue(audio_musicDetails) as MusicDetails;
    // 播放时间
    const playProgressTime = useRecoilValue(audio_playProgressTime);
    const totalPlayTime = useRecoilValue(audio_totalPlayTime);
    return (
        <div className={'playerController'}>
            <div className="playerController-coverPicture-container">
                <div className="playerController-coverPicture-box">
                    <ImageLazy
                        src={musicDetails.coverPicture + '?param=1024y1024'}
                        className="playerController-coverPicture"
                    ></ImageLazy>
                </div>
            </div>
            <div className="playerController-content">
                <div className="playerController-content-text">
                    <h1>{musicDetails.name}</h1>
                    <p>
                        <AuthorTags
                            className={'playerController-content-author'}
                            authors={musicDetails.authors || []}
                        />
                    </p>
                </div>
                <Like
                    className={'playerController-content-like'}
                    id={musicDetails.id}
                    size={'28px'}
                ></Like>
            </div>
            <div className="playerController-progressBar-box">
                <span className={'playerController-time'}>
                    {playProgressTime.minute}:{playProgressTime.second}
                </span>
                <AudioProgressBar
                    tooltipVisible={false}
                    className={'playerController-progressBar'}
                />
                <span className={'playerController-time'}>
                    {totalPlayTime.minute}:{totalPlayTime.second}
                </span>
            </div>
            <AudioController size={'large'} color={'white'} />
        </div>
    );
};

export default PlayerController;
