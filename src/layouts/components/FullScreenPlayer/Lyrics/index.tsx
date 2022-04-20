import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import './index.less'
import { CaretLeftOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { audio_instance, audio_progressBarValue } from '@/recoil/audio/atom'
import { useScroll } from '@/hooks'
import { music_lyrics } from '@/recoil/muisc'

const Lyrics: FC = () => {
    const lastIndex = useRef<number | null>(null)
    const lyricsBox = useRef<HTMLDivElement>(null)
    const [isScroll, setIsScroll] = useState(true)
    const audio = useRecoilValue(audio_instance)
    const progressBarValue = useRecoilValue(audio_progressBarValue)
    const lyrics = useRecoilValue(music_lyrics)
    const setPlaybackProgress = useCallback((time) => {
        audio.currentTime = time
    }, [])
    // 歌词高亮
    const activeIndex = useMemo(() => {
        const index = lyrics.findIndex(({ lyric, time }, index) => {
            if (time === null) return
            return Math.floor(time) === progressBarValue && lyric.length
        })
        if (index !== -1 && index !== lastIndex.current)
            lastIndex.current = index
        return lastIndex.current
    }, [progressBarValue])
    const toScroll = useScroll()
    // 歌词滚动
    useEffect(() => {
        if (
            lyricsBox.current === null ||
            lastIndex.current === null ||
            !isScroll
        )
            return
        const { offsetHeight: boxHeight, children } = lyricsBox.current
        const { offsetTop, offsetHeight } = children[
            lastIndex.current
        ] as HTMLElement
        const offset = offsetTop - boxHeight / 2 + offsetHeight / 2
        toScroll(lyricsBox.current, offset, 300)
    }, [lastIndex.current])
    const onMouseOver = useCallback(() => {
        setIsScroll(false)
    }, [])
    const onMouseLeave = useCallback(() => {
        setIsScroll(true)
    }, [])
    return (
        <div
            className={'lyrics'}
            ref={lyricsBox}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseLeave}
        >
            {/*如果 time 都是null 就表示当前歌词不支持滚动*/}
            {lyrics.every(({ time }) => time === null) ? (
                <p className={'lyrics-donTScroll'}>*该歌词不支持自动滚动* </p>
            ) : undefined}
            {lyrics.map(({ lyric, zhLyric, time }, i) => {
                return lyric.length ? (
                    <div
                        key={i}
                        className={[
                            'lyrics-item',
                            activeIndex === i ? 'active' : undefined
                        ].join(' ')}
                    >
                        <p>{lyric}</p>
                        <p>{zhLyric}</p>
                        {time ? (
                            <CaretLeftOutlined
                                onClick={() => setPlaybackProgress(time)}
                                className={'lyrics-playIcon'}
                            />
                        ) : undefined}
                    </div>
                ) : (
                    <div key={i} className={'lyrics-blankSpace'}></div>
                )
            })}
        </div>
    )
}

export default Lyrics
