import React, { useCallback, useEffect, useRef, useState } from 'react'
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
} from '@/recoil/atom'
import AuthorTags from '@/components/AuthorTags'
import { music_detail } from '@/recoil/muisc'
import { setting_fullScreenPlayerVisible } from '@/recoil/setting'
import CurrentlyPlaying from '@/layouts/components/MusicPlayer/CurrentlyPlaying'
import { CSSTransition } from 'react-transition-group'
import { secondTurnTime } from '@/utils'
import { useAudio } from '@/hooks/audio'

const MusicPlayer = () => {
    const { audioNext } = useAudio()
    const musicDetail = useRecoilValue(music_detail)
    const setIsLyricsView = useSetRecoilState(setting_fullScreenPlayerVisible)
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
    // 进度条是否被拖动
    const isDragProgressBar = useRecoilValue(audio_isDragProgressBar)
    const isDragProgressBarRef = useRef<boolean>(isDragProgressBar)
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
        audioNext()
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
    useEffect(() => {
        isDragProgressBarRef.current = isDragProgressBar
    }, [isDragProgressBar])
    return (
        <div className={'musicPlayer gaussianBlur'}>
            {musicDetail !== null && (
                <AudioProgressBar
                    className={[
                        'musicPlayer-progressBar',
                        isDragProgressBar ? 'active' : ''
                    ].join(' ')}
                />
            )}
            <div className='musicPlayer-container'>
                <div className='musicPlayer-Info'>
                    {musicDetail !== null && (
                        <>
                            <ImageLazy
                                className={'musicPlayer-coverPicture'}
                                src={musicDetail.coverPicture}
                            />
                            <div className='musicPlayer-content'>
                                <p className='musicPlayer-name text-1LinesHide'>
                                    {musicDetail.name}
                                </p>
                                <p className='musicPlayer-author text-1LinesHide'>
                                    <AuthorTags authors={musicDetail.authors} />
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
                            <Tooltip placement='top' title='下载'>
                                <i className='musicPlayer-icon-download iconfont icon-xiazai' />
                            </Tooltip>
                            <Tooltip placement='top' title='播放列表'>
                                <i
                                    onClick={() =>
                                        setPlayListVisible(!playListVisible)
                                    }
                                    className={[
                                        'musicPlayer-icon-playList iconfont icon-bofangliebiao'
                                    ].join(' ')}
                                />
                            </Tooltip>
                            <Tooltip placement='top' title='歌词'>
                                <i
                                    onClick={() => setIsLyricsView(true)}
                                    className={[
                                        'musicPlayer-icon-expansion iconfont icon-lrc'
                                    ].join(' ')}
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
            </div>
            <CSSTransition
                unmountOnExit
                in={playListVisible}
                classNames='rightZoomFade'
                timeout={300}
            >
                <CurrentlyPlaying />
            </CSSTransition>
        </div>
    )
}
export default MusicPlayer
