import React, { FC, useEffect, useRef, useState } from 'react'
import './index.less'
import { Tag } from 'antd'
import CustomButton from '@/components/CustomButton'
import { history } from 'umi'
import { SongListRequst } from '@/server/api/songList'
import { formatSongListBasicInfo } from '@/utils/objectFormatting'
import { SongListBasicInfo } from '@/types/songList'

const getSongListDetail = async (id: number): Promise<SongListBasicInfo> => {
    const { playlist } = await SongListRequst.getSongListDetail(id)
    const detail = playlist || []
    return formatSongListBasicInfo(detail)
}
const SongListDetail: FC = () => {
    const id = history.location.query?.id
    const [basicInfo, setBasicInfo] =
        useState<Nullable<SongListBasicInfo>>(null)
    const introductionRef = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        // console.log(computeLineCount(introductionRef.current))
        getSongListDetail(Number(id)).then((r) => setBasicInfo(r))
    }, [])
    console.log(basicInfo)
    return (
        <div className={'app-container songListDetail'}>
            {basicInfo !== null && (
                <div className='songListDetail-infoContainer'>
                    <img
                        className={'songListDetail-coverPicture'}
                        src={basicInfo.coverPicture + '?param=250y250'}
                        alt=''
                    />
                    <div className='songListDetail-info'>
                        <div className='songListDetail-info-title'>
                            <Tag color='volcano'>volcano</Tag>
                            <h1>{basicInfo.name}</h1>
                        </div>
                        <div className='songListDetail-info-user'>
                            <img
                                className={'songListDetail-info-user-avatar'}
                                src={
                                    basicInfo.createUser.avatarUrl +
                                    '?param=250y250'
                                }
                                alt=''
                            />
                            <span
                                className={'songListDetail-info-user-nickname'}
                            >
                                {basicInfo.createUser.nickname}
                            </span>
                            <span
                                className={
                                    'songListDetail-info-user-createTime'
                                }
                            >
                                {basicInfo.updateTime}
                            </span>
                        </div>
                        <div className='songListDetail-info-tags'>
                            <span className={'songListDetail-info-label'}>
                                标签：
                            </span>
                            <span className='songListDetail-info-tag'>
                                华语
                            </span>
                            <span className='songListDetail-info-tag'>
                                /夜晚/
                            </span>
                            <span className='songListDetail-info-tag'>
                                治愈
                            </span>
                        </div>
                        <div className='songListDetail-info-count'>
                            <p>
                                <span className='songListDetail-info-label'>
                                    歌曲：
                                </span>
                                {basicInfo.musicCount}
                            </p>
                            <p>
                                <span className='songListDetail-info-label'>
                                    播放：
                                </span>
                                {basicInfo.playCount}
                            </p>
                        </div>
                        <div className='songListDetail-info-introduction-box'>
                            <span className={'songListDetail-info-label'}>
                                简介：
                            </span>
                            <div className={'songListDetail-info-introduction'}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: basicInfo.introduce
                                    }}
                                ></span>
                                <span
                                    className={'visibilityHidden'}
                                    ref={introductionRef}
                                    dangerouslySetInnerHTML={{
                                        __html: basicInfo.introduce
                                    }}
                                ></span>
                            </div>
                        </div>
                        <div className={'songListDetail-info-action'}>
                            <CustomButton
                                size={'small'}
                                icon={'icon-bofang'}
                                type={'primary'}
                            >
                                播放全部
                            </CustomButton>
                            <CustomButton
                                size={'small'}
                                icon={'icon-shoucang1'}
                                type={'default'}
                            >
                                收藏
                            </CustomButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SongListDetail
