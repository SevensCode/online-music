import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Slider, Tooltip } from 'antd'
import './index.less'
import { STORE_AUDIO_VOLUME } from '@/constants'
import { useRecoilState, useRecoilValue } from 'recoil'
import { audio_instance, audio_volume } from '@/recoil/audio/atom'
import store from 'store'

const AudioVolume = () => {
    const [volume, setVolume] = useRecoilState(audio_volume)
    // 0静音 1中等音量 2最大音量
    const [volumeStatus, setVolumeStatus] = useState(1)
    const audio = useRecoilValue(audio_instance)
    useEffect(() => {
        handleVolumeStatus(volume)
        audio.volume = volume / 100
        store.set(STORE_AUDIO_VOLUME, volume)
    }, [volume])

    const volumeStatusMemo = useMemo(() => {
        switch (volumeStatus) {
            case 0:
                return 'icon-guanbishengyin'
            case 1:
                return 'icon-zhongdengyinliang'
            case 2:
                return 'icon-zuidayinliang'
        }
    }, [volumeStatus])
    const handleVolumeStatus = useCallback((volume) => {
        if (volume > 50) setVolumeStatus(2)
        else if (volume <= 50 && volume !== 0) setVolumeStatus(1)
        else if (volume === 0) setVolumeStatus(0)
    }, [])
    const onClick = useCallback(() => {
        if (volumeStatus !== 0) {
            setVolumeStatus(0)
            audio.volume = 0
        } else {
            handleVolumeStatus(volume || 50)
            audio.volume = volume / 100 || 0.5
            volume === 0 && setVolume(50)
        }
    }, [volumeStatus, volume])
    const onChange = useCallback((v) => setVolume(v), [])
    return (
        <div className={'audioVolume'}>
            <Tooltip placement='top' title='音量'>
                <i
                    onClick={onClick}
                    className={['volume', 'iconfont', volumeStatusMemo].join(
                        ' '
                    )}
                />
            </Tooltip>
            <Slider
                value={volume}
                onChange={onChange}
                defaultValue={30}
                className='volume-progressBar'
            />
        </div>
    )
}

export default AudioVolume
