import React, { useCallback } from 'react'
import ImageLazy from '@/components/ImageLazy'
import Tags from '@/components/Tags'
import Like from '@/components/Like'
import AudioProgressBar from '@/components/Audio/ProgressBar'
import AudioController from '@/components/Audio/Controller'
import { useRecoilValue } from 'recoil'
import { audio_playProgressTime, audio_totalPlayTime } from '@/recoil/audio'
import './index.less'
import { MusicDetail } from '@/types/music'
import { music_detail } from '@/recoil/muisc'
import { history } from 'umi'

const PlayerController = () => {
    const musicDetail = useRecoilValue(music_detail) as MusicDetail
    // 播放时间
    const playProgressTime = useRecoilValue(audio_playProgressTime)
    const totalPlayTime = useRecoilValue(audio_totalPlayTime)
    const seeSingerDetail = useCallback((name, id) => {
        history.push({
            pathname: '/singerDetail',
            query: {
                id
            }
        })
    }, [])
    return (
        <div className={'playerController'}>
            <div className='playerController-coverPicture-container'>
                <div className='playerController-coverPicture-box'>
                    <ImageLazy src={musicDetail.coverPicture + '?param=1024y1024'} className='playerController-coverPicture'></ImageLazy>
                </div>
            </div>
            <div className='playerController-content'>
                <div className='playerController-content-text'>
                    <h1>{musicDetail.name}</h1>
                    <p>
                        <Tags onClick={seeSingerDetail} className={'playerController-content-author'} tags={musicDetail.authors || []} />
                    </p>
                </div>
                <Like className={'playerController-content-like'} id={musicDetail.id} size={'large'}></Like>
            </div>
            <div className='playerController-progressBar-box'>
                <span className={'playerController-time'}>
                    {playProgressTime.minute}:{playProgressTime.second}
                </span>
                <AudioProgressBar tooltipVisible={false} className={'playerController-progressBar'} />
                <span className={'playerController-time'}>
                    {totalPlayTime.minute}:{totalPlayTime.second}
                </span>
            </div>
            <AudioController className={'playerController-controller'} />
        </div>
    )
}

export default PlayerController
