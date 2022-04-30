import React, { FC, Ref, useEffect, useRef, useState } from 'react'
import { SongList, SongListDetail } from '@/types/songList'
import timeTool from '@/utils/dateTool'
import Tags from '@/components/Tags'
import CustomButton from '@/components/CustomButton'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { useAudio } from '@/hooks/audio'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { audio_playType } from '@/recoil/audio'
import { MusicDetail } from '@/types/music'
import { music_songList } from '@/recoil/muisc'
import { SongListRequst } from '@/server/api/songList'
import { message } from 'antd'
import './index.less'
import { computeLineCount, numberUnit, randomInteger } from '@/utils/tool'

interface Interface {
    basicInfo: SongListDetail
    songList: SongList
    basicInfoRef?: Ref<HTMLDivElement>

    updateBasicInfo(): void
}

const SongListBasicInfo: FC<Interface> = ({ basicInfo, songList, basicInfoRef, updateBasicInfo }) => {
    const [lineCount, setLineCount] = useState(0)
    const [isExpand, setExpand] = useState(false)
    const [loading, setLoading] = useState(false)
    const introductionRef = useRef<HTMLSpanElement>(null)
    const setGlobalSongList = useSetRecoilState(music_songList)
    const playType = useRecoilValue(audio_playType)
    const { audioPlay } = useAudio()
    useEffect(() => {
        if (introductionRef.current === null) return
        // 计算行数
        setLineCount(computeLineCount(introductionRef.current))
    }, [basicInfo])
    // 播放全部
    const playAll = () => {
        let musicDetail: MusicDetail
        if (playType === 3) {
            const index = randomInteger([0, songList.list.length], [])
            musicDetail = songList.list[index]
        } else {
            musicDetail = songList.list[0]
        }
        setGlobalSongList(songList)
        audioPlay(musicDetail)
    }

    // 收藏动作
    const subscribedAction = async () => {
        try {
            setLoading(true)
            const { code } = await SongListRequst.subscribedAction(songList.id, basicInfo.subscribed ? 2 : 1)
            if (code !== 200) return
            message.success(basicInfo.subscribed ? '取消收藏成功！' : '收藏成功')
            await updateBasicInfo()
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }
    return (
        <div ref={basicInfoRef} className='songListDetail-infoContainer'>
            <img className={'songListDetail-coverPicture'} src={basicInfo.coverPicture + '?param=250y250'} alt='' />
            <div className='songListDetail-info'>
                <h1 className='songListDetail-info-title'>{basicInfo.name}</h1>
                <div className='songListDetail-info-user'>
                    <img className={'songListDetail-info-user-avatar'} src={basicInfo.createUser.avatarUrl + '?param=250y250'} alt='' />
                    <span className={'songListDetail-info-user-nickname'}>{basicInfo.createUser.nickname}</span>
                    <span className={'songListDetail-info-user-createTime'}>{timeTool(basicInfo.updateTime).fromNow()}更新</span>
                </div>
                <div className='songListDetail-info-tags'>
                    <span className={'songListDetail-info-label'}> 标签：</span>
                    <Tags
                        className='songListDetail-info-tag'
                        tags={basicInfo.tags.map((item, i) => ({
                            name: item,
                            id: i
                        }))}></Tags>
                </div>
                <div className='songListDetail-info-count'>
                    <p>
                        <span className='songListDetail-info-label'>歌曲：</span>
                        {basicInfo.musicCount}
                    </p>
                    <p>
                        <span className='songListDetail-info-label'>播放：</span>
                        {basicInfo.playCount}
                    </p>
                </div>
                <div className='songListDetail-info-introduction-box'>
                    <span className={'songListDetail-info-label'}>简介：</span>
                    <div className={'songListDetail-info-introduction'}>
                        <span className={['stringWrap', isExpand ? '' : 'text-1LinesHide'].join(' ')}>{basicInfo.introduce}</span>
                        <span className={'contentHidden stringWrap'} ref={introductionRef}>
                            {basicInfo.introduce}
                        </span>
                    </div>
                    {lineCount > 1 && (
                        <CustomButton onClick={() => setExpand(!isExpand)} type={'text'}>
                            {isExpand ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        </CustomButton>
                    )}
                </div>
                <div className={'songListDetail-info-action'}>
                    <CustomButton onClick={playAll} size={'small'} icon={'icon-bofang'} type={'primary'}>
                        播放全部
                    </CustomButton>
                    <CustomButton
                        loading={loading}
                        onClick={subscribedAction}
                        size={'small'}
                        className={basicInfo.subscribed ? 'subscribed' : ''}
                        icon={basicInfo.subscribed ? 'icon-shoucang3' : 'icon-shoucang1'}
                        type={'default'}>
                        收藏({numberUnit(basicInfo.subscribedCount)})
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default SongListBasicInfo
