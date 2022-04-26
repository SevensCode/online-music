import React, { FC, useCallback } from 'react'
import { AUDIO_PLAY_TYPE, STORE_PLAY_TYPE } from '@/constants'
import { Tooltip } from 'antd'
import { useRecoilState } from 'recoil'
import { audio_playType } from '@/recoil/audio'
import store from 'store'
import CustomButton from '@/components/CustomButton'

interface Interface {
    className?: string

    onChange?(type: number): void
}

const AudioPlayType: FC<Interface> = ({ className, onChange }) => {
    const [playType, setPlayType] = useRecoilState(audio_playType)
    const handlePlayTyoe = useCallback(() => {
        let type
        playType !== AUDIO_PLAY_TYPE.length - 1
            ? (type = playType + 1)
            : (type = 0)
        setPlayType(type)
        store.set(STORE_PLAY_TYPE, type)
        onChange && onChange(type)
    }, [playType])
    return (
        <Tooltip placement='top' title={AUDIO_PLAY_TYPE[playType].name}>
            <CustomButton
                type={'text'}
                icon={AUDIO_PLAY_TYPE[playType].icon}
                onClick={handlePlayTyoe}
            ></CustomButton>
        </Tooltip>
    )
}

export default AudioPlayType
