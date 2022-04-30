import React, { useCallback, useEffect, useState } from 'react'
import './index.less'
import ImageLazy from '@/components/ImageLazy'
import AudioController from '@/components/Audio/Controller'
import AudioPlayType from '@/components/Audio/PlayType'
import MusicVolume from '@/components/Audio/Volume'
import { message, Tooltip } from 'antd'
import AudioProgressBar from '@/components/Audio/ProgressBar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
    audio_instance,
    audio_isDragProgressBar,
    audio_playProgressTime,
    audio_playType,
    audio_progressBarValue,
    auido_status
} from '@/recoil/audio'
import Tags from '@/components/Tags'
import { music_detail, music_getMusicIndex, music_songList } from '@/recoil/muisc'
import { setting_fullScreenPlayerVisible } from '@/recoil/setting'
import CurrentlyPlaying from '@/layouts/components/MusicPlayer/CurrentlyPlaying'
import { CSSTransition } from 'react-transition-group'
import { randomInteger, secondTurnTime } from '@/utils/tool'
import { useAudio } from '@/hooks/audio'
import { useRefState } from '@/hooks'
import CustomButton from '@/components/CustomButton'

const MusicPlayer = () => {
    const { audioNext, audioPlay } = useAudio()
    // 音乐详情
    const musicDetail = useRecoilValue(music_detail)
    const musicDetailRef = useRefState(musicDetail)
    // 歌词是否显示
    const setIsLyricsView = useSetRecoilState(setting_fullScreenPlayerVisible)
    // 播放列表
    const [playListVisible, setPlayListVisible] = useState(false)
    const audio = useRecoilValue(audio_instance)
    // 播放器状态
    const setAudioStatus = useSetRecoilState(auido_status)
    // 进度条的值
    const setProgressBarValue = useSetRecoilState(audio_progressBarValue)
    // 播放进度时间
    const stePlayProgressTime = useSetRecoilState(audio_playProgressTime)
    // 播放类型
    const playType = useRecoilValue(audio_playType)
    const playTypeRef = useRefState<number>(playType)
    // 进度条是否被拖动
    const isDragProgressBar = useRecoilValue(audio_isDragProgressBar)
    const isDragProgressBarRef = useRefState<boolean>(isDragProgressBar)
    // 音乐索引
    const musicIndex = useRecoilValue(music_getMusicIndex)
    const musicIndexRef = useRefState<Nullable<number>>(musicIndex)
    // 歌单
    const songList = useRecoilValue(music_songList)
    const songListRef = useRefState(songList)
    // 播放中
    const timeupdate = useCallback(() => {
        if (isDragProgressBarRef.current) return false
        const currentTime = Math.floor(audio.currentTime)
        // 更新进度条
        setProgressBarValue(currentTime)
        // 更新播放时间
        stePlayProgressTime(secondTurnTime(currentTime))
    }, [isDragProgressBarRef])
    // 播放完成
    const ended = useCallback(() => {
        setAudioStatus(0)
        if (songListRef.current === null || musicDetailRef.current === null) return
        if (musicIndexRef.current === null) return
        const {
            list,
            list: { length }
        } = songListRef.current
        let index = musicIndexRef.current
        switch (playTypeRef.current) {
            // 顺序播放
            case 0:
                index !== length - 1 && audioPlay(list[++index])
                break
            // 列表循环
            case 1:
                audioNext()
                break
            // 单曲循环
            case 2:
                audioPlay(list[index])
                break
            // 随机播放
            case 3:
                audioPlay(list[randomInteger([0, list.length], [index])])
                break
        }
    }, [])
    // 加载错误
    const error = useCallback(() => {
        message.error('音乐播放失败！')
    }, [])
    useEffect(() => {
        audio.addEventListener('error', error)
        audio.addEventListener('timeupdate', timeupdate)
        audio.addEventListener('ended', ended)
        return () => {
            audio.removeEventListener('error', error)
            audio.removeEventListener('timeupdate', timeupdate)
            audio.removeEventListener('ended', ended)
        }
    }, [])
    return (
        <div className={'musicPlayer gaussianBlur'}>
            {musicDetail !== null && (
                <AudioProgressBar className={['musicPlayer-progressBar', isDragProgressBar ? 'active' : ''].join(' ')} />
            )}
            <div className='musicPlayer-container'>
                <div className='musicPlayer-Info'>
                    {musicDetail !== null && (
                        <>
                            <ImageLazy className={'musicPlayer-coverPicture'} src={musicDetail.coverPicture} />
                            <div className='musicPlayer-content'>
                                <p className='musicPlayer-name text-1LinesHide'>{musicDetail.name}</p>
                                <p className='musicPlayer-author text-1LinesHide'>
                                    <Tags tags={musicDetail.authors} />
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <div className='musicPlayer-controller'>
                    <AudioController />
                </div>
                <div className='musicPlayer-otherAction'>
                    {musicDetail !== null && (
                        <>
                            <AudioPlayType />
                            <MusicVolume />

                            <Tooltip placement='top' title='播放列表'>
                                <CustomButton
                                    type={'text'}
                                    onClick={() => setPlayListVisible(!playListVisible)}
                                    icon={'icon-bofangliebiao'}></CustomButton>
                            </Tooltip>
                            <Tooltip placement='top' title='歌词'>
                                <CustomButton type={'text'} onClick={() => setIsLyricsView(true)} icon={'icon-lrc'}></CustomButton>
                            </Tooltip>
                        </>
                    )}
                </div>
            </div>
            <CSSTransition unmountOnExit in={playListVisible} classNames='rightZoomFade' timeout={300}>
                <CurrentlyPlaying />
            </CSSTransition>
        </div>
    )
}
export default MusicPlayer
