import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
    audio_instance,
    audio_playType,
    audio_totalPlayTime,
    auido_status
} from '@/recoil/audio/atom'
import { useCallback } from 'react'
import { MusicDetail, MusicLyricsArr } from '@/recoil/types/music'
import { millisecondTurnTime, randomInteger } from '@/utils'
import { MusicRequest } from '@/api/music'
import { music_detail, music_lyrics, music_songList } from '@/recoil/muisc'
import { SongList } from '@/recoil/types/songList'

// 音频播放器
export const useAudio = () => {
    const audio = useRecoilValue(audio_instance)
    // 音乐详情
    const [musicDetail, setMusicDetail] = useRecoilState(music_detail)
    // 播放器状态
    const setAudioStatus = useSetRecoilState(auido_status)
    // 音乐总时间
    const setTotalPlayTime = useSetRecoilState(audio_totalPlayTime)
    // 设置歌词
    const setLyrics = useSetRecoilState(music_lyrics)
    // 播放类型
    const playType = useRecoilValue(audio_playType)
    // 歌单
    const songList = useRecoilValue(music_songList)
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
        audio.play().then((r) => setAudioStatus(2))
    }
    // 暂停
    const audioPause = () => {
        audio.pause()
        setAudioStatus(0)
    }
    // 下一首
    const audioNext = useCallback(() => {
        if (songList === null || musicDetail === null) return
        handleSwitchingMusic('next', songList, musicDetail)
    }, [songList, musicDetail])
    // 上一首
    const audioPrev = useCallback(() => {
        if (songList === null || musicDetail === null) return
        handleSwitchingMusic('prev', songList, musicDetail)
    }, [songList, musicDetail])
    // 处理切换音乐
    const handleSwitchingMusic = useCallback(
        (
            type: 'next' | 'prev',
            songList: SongList,
            musicDetail: MusicDetail
        ) => {
            const { list } = songList
            if (!list.length || list.length === 1) return
            let index = list.findIndex((item) => item.id === musicDetail.id)
            if (index === -1) return
            switch (playType) {
                case 3:
                    index = randomInteger([0, list.length], [index])
                    break
                default:
                    if (type === 'next') {
                        index === list.length - 1 ? (index = 0) : index++
                    } else if (type === 'prev') {
                        index === 0 ? (index = list.length - 1) : index--
                    }
            }
            audioPlay(list[index])
        },
        [playType, songList, musicDetail]
    )
    return { audioPlay, audioPause, audioNext, audioPrev }
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
