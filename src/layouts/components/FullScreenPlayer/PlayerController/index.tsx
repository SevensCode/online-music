import React from 'react'
import ImageLazy from '@/components/ImageLazy'
import AuthorTags from '@/components/AuthorTags'
import Like from '@/components/Like'
import AudioProgressBar from '@/components/Audio/ProgressBar'
import AudioController from '@/components/Audio/Controller'
import { useRecoilValue } from 'recoil'
import { audio_playProgressTime, audio_totalPlayTime } from '@/recoil/atom'
import './index.less'
import { MusicDetail } from '@/recoil/types/music'
import { music_detail } from '@/recoil/muisc'

const PlayerController = () => {
    const musicDetail = useRecoilValue(music_detail) as MusicDetail
    // 播放时间
    const playProgressTime = useRecoilValue(audio_playProgressTime)
    const totalPlayTime = useRecoilValue(audio_totalPlayTime)
    return (
        <div className={'playerController'}>
            <div className='playerController-coverPicture-container'>
                <div className='playerController-coverPicture-box'>
                    <ImageLazy
                        src={musicDetail.coverPicture + '?param=1024y1024'}
                        className='playerController-coverPicture'
                    ></ImageLazy>
                </div>
            </div>
            <div className='playerController-content'>
                <div className='playerController-content-text'>
                    <h1>{musicDetail.name}</h1>
                    <p>
                        <AuthorTags
                            className={'playerController-content-author'}
                            authors={musicDetail.authors || []}
                        />
                    </p>
                </div>
                <Like
                    className={'playerController-content-like'}
                    id={musicDetail.id}
                    size={'28px'}
                ></Like>
            </div>
            <div className='playerController-progressBar-box'>
                <span className={'playerController-time'}>
                    {playProgressTime.minute}:{playProgressTime.second}
                </span>
                <AudioProgressBar
                    tooltipVisible={false}
                    className={'playerController-progressBar'}
                />
                <span className={'playerController-time'}>
                    {totalPlayTime.minute}:{totalPlayTime.second}
                </span>
            </div>
            <AudioController size={'large'} color={'white'} />
        </div>
    )
}

export default PlayerController
