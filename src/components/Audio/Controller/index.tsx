import React, { FC, useCallback, useMemo } from 'react'
import { Tooltip } from 'antd'
import './index.less'
import { useRecoilValue } from 'recoil'
import { auido_status } from '@/recoil/audio'
import { useAudio } from '@/hooks/audio'
import { music_detail } from '@/recoil/muisc'
import CustomButton from '@/components/CustomButton'

interface Props {
    className?: string
}

const AudioController: FC<Props> = ({ className }) => {
    const musicDetail = useRecoilValue(music_detail)
    const audioStatus = useRecoilValue(auido_status)
    const { audioPlay, audioPause, audioNext, audioPrev } = useAudio()
    const status = useMemo(
        () => ({
            name: audioStatus === 2 ? '暂停' : '播放',
            icon: audioStatus === 2 ? 'icon-zanting2' : 'icon-bofang1'
        }),
        [audioStatus]
    )
    const playOrPause = useCallback(() => {
        audioStatus === 2 ? audioPause() : audioPlay()
    }, [audioStatus])
    const test = useCallback(() => {
        audioNext()
    }, [])
    return (
        <div
            className={['controller', musicDetail ?? 'disable', className].join(
                ' '
            )}
        >
            <Tooltip placement='top' title='上一首'>
                <CustomButton
                    type={'text'}
                    size={'middle'}
                    icon={'icon-shangyishou'}
                    onClick={audioPrev}
                ></CustomButton>
            </Tooltip>
            <Tooltip placement='top' title={status.name}>
                <CustomButton
                    type={'text'}
                    size={'large'}
                    icon={status.icon}
                    onClick={playOrPause}
                ></CustomButton>
            </Tooltip>
            <Tooltip placement='top' title='下一首'>
                <CustomButton
                    type={'text'}
                    size={'middle'}
                    icon={'icon-xiayishou'}
                    onClick={audioNext}
                ></CustomButton>
            </Tooltip>
        </div>
    )
}

export default AudioController
