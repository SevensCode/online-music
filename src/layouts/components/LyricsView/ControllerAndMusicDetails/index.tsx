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

const ControllerAndMusicDetails = () => {
    const musicDetails = useRecoilValue(audio_musicDetails);
    // 播放时间
    const playProgressTime = useRecoilValue(audio_playProgressTime);
    const totalPlayTime = useRecoilValue(audio_totalPlayTime);
    return (
        <div className={'lyricsView-musicDetails'}>
            <div className="lyricsView-coverPicture-container">
                <div className="lyricsView-coverPicture-box">
                    <ImageLazy
                        src={musicDetails?.coverPicture + '?param=1024y1024'}
                        className="lyricsView-coverPicture"
                    ></ImageLazy>
                </div>
            </div>
            <div className="lyricsView-content">
                <div className="lyricsView-content-text">
                    <h1>{musicDetails?.name}</h1>
                    <p>
                        <AuthorTags
                            className={'lyricsView-content-author'}
                            authors={musicDetails?.authors || []}
                        />
                    </p>
                </div>
                <Like
                    className={'lyricsView-content-like'}
                    id={1}
                    size={'28px'}
                ></Like>
            </div>
            <div className="lyricsView-progressBar-box">
                <span className={'lyricsView-time'}>
                    {playProgressTime.minute}:{playProgressTime.second}
                </span>
                <AudioProgressBar
                    tooltipVisible={false}
                    className={'lyricsView-progressBar'}
                />
                <span className={'lyricsView-time'}>
                    {totalPlayTime.minute}:{totalPlayTime.second}
                </span>
            </div>
            <AudioController size={'large'} color={'white'} />
        </div>
    );
};

export default ControllerAndMusicDetails;
