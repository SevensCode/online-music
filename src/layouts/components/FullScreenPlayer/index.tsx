import React, { FC } from 'react'
import './index.less'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import PlayerController from '@/layouts/components/FullScreenPlayer/PlayerController'
import Lyrics from '@/layouts/components/FullScreenPlayer/Lyrics'
import { music_detail } from '@/recoil/muisc'
import { setting_fullScreenPlayerVisible } from '@/recoil/setting'

const FullScreenPlayer: FC = () => {
    const musicDetail = useRecoilValue(music_detail)
    const setIsLyricsView = useSetRecoilState(setting_fullScreenPlayerVisible)
    return (
        <div
            className={'lyricsView'}
            style={{
                backgroundImage: `url(${
                    musicDetail?.coverPicture + '?param=1024y1024'
                })`
            }}
        >
            <div className='lyricsView-maskLayer gaussianBlur'>
                <PlayerController />
                <Lyrics />
                <i
                    onClick={() => setIsLyricsView(false)}
                    className='iconfont icon-rollback lyricsView-back'
                ></i>
            </div>
        </div>
    )
}

export default FullScreenPlayer
