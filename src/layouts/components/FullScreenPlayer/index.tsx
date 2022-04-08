import React, { FC } from 'react';
import './index.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    audio_isShowFullScreenPlayer,
    audio_musicDetails,
} from '@/recoil/audio';
import PlayerController from '@/layouts/components/FullScreenPlayer/PlayerController';
import Lyrics from '@/layouts/components/FullScreenPlayer/Lyrics';

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
                <PlayerController />
                <Lyrics />
                <i
                    onClick={() => setIsLyricsView(false)}
                    className="iconfont icon-rollback lyricsView-back"
                ></i>
            </div>
        </div>
    );
};

export default FullScreenPlayer;
