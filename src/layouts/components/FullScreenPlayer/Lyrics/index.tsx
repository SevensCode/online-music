import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import './index.less';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import {
    audio_instance,
    audio_lyrics,
    audio_progressBarValue,
} from '@/recoil/audio';

const Lyrics: FC = () => {
    const lastIndex = useRef<number>(0);
    const lyricsBox = useRef<HTMLDivElement>(null);
    const audio = useRecoilValue(audio_instance);
    const progressBarValue = useRecoilValue(audio_progressBarValue);
    const lyrics = useRecoilValue(audio_lyrics);
    const setPlaybackProgress = useCallback((time) => {
        audio.currentTime = time;
    }, []);
    const activeIndex = useMemo(() => {
        const index = lyrics.findIndex(
            (item, index) => item.time === progressBarValue,
        );
        if (index !== -1 && index !== lastIndex.current)
            lastIndex.current = index;
        return lastIndex.current;
    }, [progressBarValue]);
    useEffect(() => {
        if (lyricsBox.current === null) return;
        // lyricsBox.current.scrollTop = lyricsBox.current.children[lastIndex.current].offsetTop - 50
    }, [lastIndex.current]);
    return (
        <div className={'lyrics'} ref={lyricsBox}>
            {lyrics.map((value, i) => {
                return (
                    <div
                        key={i}
                        className={[
                            'lyrics-item',
                            activeIndex === i ? 'active' : undefined,
                        ].join(' ')}
                    >
                        <p>{value.lyric}</p>
                        <p>{value.zhLyric}</p>
                        <CaretLeftOutlined
                            onClick={() => setPlaybackProgress(value.time)}
                            className={'lyrics-playIcon'}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Lyrics;
