import React, { FC } from 'react';
import './index.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    audio_isLyricsView,
    audio_lyrics,
    audio_musicDetails,
} from '@/recoil/audio';
import ControllerAndMusicDetails from '@/layouts/components/LyricsView/ControllerAndMusicDetails';
import { CaretLeftOutlined } from '@ant-design/icons';

const LyricsView: FC = () => {
    const musicDetails = useRecoilValue(audio_musicDetails);
    const setIsLyricsView = useSetRecoilState(audio_isLyricsView);
    const lyrics = useRecoilValue(audio_lyrics);
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
                <ControllerAndMusicDetails />
                <div className={'lyricsView-lyrics'}>
                    {lyrics.map((value, i) => {
                        return (
                            <>
                                <div
                                    key={i}
                                    className={'lyricsView-lyrics-item'}
                                >
                                    <p>{value.lyric}</p>
                                    <p>{value.zhLyric}</p>
                                    <CaretLeftOutlined
                                        className={'lyricsView-playIcon'}
                                    />
                                </div>
                            </>
                        );
                    })}
                </div>
                <i
                    onClick={() => setIsLyricsView(false)}
                    className="iconfont icon-rollback lyricsView-back"
                ></i>
            </div>
        </div>
    );
};

export default LyricsView;
