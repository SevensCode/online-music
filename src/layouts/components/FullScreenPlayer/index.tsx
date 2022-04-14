import React, { FC } from 'react';
import './index.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    audio_isShowFullScreenPlayer,
    audio_musicDetails,
} from '@/recoil/audio';
import PlayerController from '@/layouts/components/FullScreenPlayer/PlayerController';
import Lyrics from '@/layouts/components/FullScreenPlayer/Lyrics';
import Comment from '@/layouts/components/FullScreenPlayer/Comment';

const FullScreenPlayer: FC = () => {
    const musicDetails = useRecoilValue(audio_musicDetails);
    const setIsLyricsView = useSetRecoilState(audio_isShowFullScreenPlayer);
    return (
        <div
            className={'lyricsView'}
            style={{
                backgroundImage: `url(${
                    musicDetails?.coverPicture + '?param=1024y1024'
                })`,
            }}
        >
            <div className="lyricsView-maskLayer gaussianBlur">
                <div className={'lyricsView-player'}>
                    <PlayerController />
                    <Lyrics />
                </div>
                <div className={'lyricsView-Comment-container'}>
                    <Comment />
                </div>
                <i
                    onClick={() => setIsLyricsView(false)}
                    className="iconfont icon-rollback lyricsView-back"
                ></i>
            </div>
        </div>
    );
};

export default FullScreenPlayer;
