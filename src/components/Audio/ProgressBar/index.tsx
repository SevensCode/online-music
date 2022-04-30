import React, { FC, useCallback } from 'react'
import { Slider } from 'antd'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { audio_instance, audio_isDragProgressBar, audio_playProgressTime, audio_progressBarValue } from '@/recoil/audio'
import { secondTurnTime } from '@/utils/tool'
import { music_detail } from '@/recoil/muisc'

interface Props {
    tooltipVisible?: boolean
    className?: string
}

const AudioProgressBar: FC<Props> = ({ className, tooltipVisible = true }) => {
    const audio = useRecoilValue(audio_instance)
    const musicDetail = useRecoilValue(music_detail)
    // 播放时间
    const [playProgressTime, stePlayProgressTime] = useRecoilState(audio_playProgressTime)
    // 进度条是否被拖动
    const setIsDragProgressBar = useSetRecoilState(audio_isDragProgressBar)
    const [progressBarValue, setProgressBarValue] = useRecoilState(audio_progressBarValue)
    const onChange = useCallback(
        value => {
            // 改拖拽为 true
            setIsDragProgressBar(true)
            // 更新进度条
            setProgressBarValue(value)
            // 更新播放时间
            stePlayProgressTime(secondTurnTime(value))
        },
        [setProgressBarValue]
    )
    const onAfterChange = useCallback(value => {
        // 更新audio播放时间
        audio.currentTime = value
        // 改拖拽为 false
        setIsDragProgressBar(false)
    }, [])
    const tipFormatter = useCallback(
        value => {
            return `${playProgressTime.minute}:${playProgressTime.second}`
        },
        [playProgressTime]
    )
    return (
        <Slider
            onChange={onChange}
            onAfterChange={onAfterChange}
            className={[className, 'progressBar'].join(' ')}
            step={1}
            tipFormatter={tooltipVisible ? tipFormatter : null}
            min={0}
            max={musicDetail ? Math.round(musicDetail.duration / 1000) : 0}
            value={progressBarValue}
        />
    )
}

export default AudioProgressBar
