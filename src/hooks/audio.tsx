import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
    audio_instance,
    audio_playType,
    audio_totalPlayTime,
    auido_status
} from '@/recoil/audio'
import { useCallback, useEffect } from 'react'
import { MusicDetail, MusicLyricsArr } from '@/types/music'
import { millisecondTurnTime, randomInteger } from '@/utils'
import { MusicRequest } from '@/server/api/music'
import {
    music_detail,
    music_getMusicIndex,
    music_lyrics,
    music_songList
} from '@/recoil/muisc'
import { useRefState } from '@/hooks/index'
import { SongList } from '@/types/songList'

// 音频播放器
export const useAudio = () => {
    const audio = useRecoilValue(audio_instance)
    // 音乐详情
    const setMusicDetail = useSetRecoilState(music_detail)
    // 播放器状态
    const setAudioStatus = useSetRecoilState(auido_status)
    // 音乐总时间
    const setTotalPlayTime = useSetRecoilState(audio_totalPlayTime)
    // 设置歌词
    const setLyrics = useSetRecoilState(music_lyrics)
    const switchingMusic = useSwitchingMusic()
    // 设置音乐信息
    const setMusicInfo = useCallback(async (musicDetail) => {
        setMusicDetail(musicDetail)
        setTotalPlayTime(millisecondTurnTime(musicDetail.duration))
        audio.src = `https://music.163.com/song/media/outer/url?id=${musicDetail.id}.mp3`
        const { code, lrc, tlyric } = await MusicRequest.getLyrics(
            musicDetail.id
        )
        if (code !== 200) return false
        setLyrics(parseLyric(lrc.lyric, tlyric?.lyric))
    }, [])
    // 播放
    const audioPlay = (musicDetail?: MusicDetail) => {
        if (musicDetail ?? musicDetail) setMusicInfo(musicDetail)
        setAudioStatus(1)
        audio
            .play()
            .then((r) => setAudioStatus(2))
            .catch((e) => {
                console.log(e)
            })
    }
    // 暂停
    const audioPause = () => {
        audio.pause()
        setAudioStatus(0)
    }

    // 下一首
    const audioNext = () => {
        switchingMusic('next', (musicDetail) => audioPlay(musicDetail))
    }
    // 上一首
    const audioPrev = () => {
        switchingMusic('prev', (musicDetail) => audioPlay(musicDetail))
    }

    return { audioPlay, audioPause, audioNext, audioPrev }
}
// 音乐切换
export const useSwitchingMusic = () => {
    // 歌单
    const songList = useRecoilValue(music_songList)
    const songListRef = useRefState<Nullable<SongList>>(songList)
    // 音乐索引
    const musicIndex = useRecoilValue(music_getMusicIndex)
    const musicIndexRef = useRefState<Nullable<number>>(musicIndex)
    // 播放类型
    const playType = useRecoilValue(audio_playType)
    const playTypeRef = useRefState<number>(playType)
    return (
        type: 'next' | 'prev',
        callback: (musicDetail: MusicDetail) => void
    ) => {
        if (songListRef.current === null) return
        if (musicIndexRef.current === null) return
        const { list } = songListRef.current
        let index = musicIndexRef.current
        if (playTypeRef.current === 3) {
            index = randomInteger([0, list.length], [index])
        } else {
            if (type === 'next') {
                index === list.length - 1 ? (index = 0) : index++
            } else if (type === 'prev') {
                index === 0 ? (index = list.length - 1) : index--
            }
        }
        callback(list[index])
    }
}

const useAudioEnded = () => {
    const audio = useRecoilValue(audio_instance)
    const ended = useCallback(() => {}, [])
    useEffect(() => {
        audio.addEventListener('ended', ended)
        return () => audio.removeEventListener('ended', ended)
    }, [])
}

export const parseLyric = (lyr: string, zhLyr?: string): MusicLyricsArr => {
    // 源歌词
    const sourceLyrics = lyr.split('\n')
    // 翻译的歌词
    const zhLyrics = zhLyr?.split('\n') || []
    // 处理后的歌词
    const processedLyrics: MusicLyricsArr = []
    // [00:00.000] 作曲 : 林俊杰
    // 定义正则表达式匹配 00:00.000
    const matchMinutesAndSeconds = /\d*:\d*\.\d*/g
    // 处理歌词时间
    const hanldeLyricTime = (lyric: string): number | null => {
        // 提取时间
        const timeStrArr = lyric.match(matchMinutesAndSeconds)
        if (timeStrArr === null) return null
        // 提取分钟 和 秒数
        const [minute, second] = timeStrArr[0].split(':')
        // 合并时间, 将分钟和秒钟都合并为秒钟
        return Number(minute) * 60 + Number(second)
    }
    sourceLyrics.forEach((lyric) => {
        const time = hanldeLyricTime(lyric)
        processedLyrics.push({
            time,
            zhLyric: '',
            lyric: lyric
                .replace(matchMinutesAndSeconds, '')
                .replace(/\[]/g, '')
                .trim()
        })
    })
    zhLyrics.forEach((lyric) => {
        const time = hanldeLyricTime(lyric)
        const index = processedLyrics.findIndex((item) => time === item.time)
        if (index === -1) return
        processedLyrics[index].zhLyric = lyric
            .replace(matchMinutesAndSeconds, '')
            .replace(/\[]/g, '')
            .trim()
    })
    return processedLyrics
}
