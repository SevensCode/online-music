import React, { FC, useEffect, useRef, useState } from 'react'
import './index.less'
import { history } from 'umi'
import { SongListRequst } from '@/server/api/songList'
import { formatSongListBasicInfo } from '@/utils/objectFormatting'
import { SongListBasicInfo } from '@/types/songList'
import Tags from '@/components/AuthorTags'
import { computeLineCount } from '@/utils'
import timeTool from '@/utils/dateTool'
import { Tabs } from 'antd'
import SearchInput from '@/components/Search'
import MusicTable from '@/components/MusicTable/index'
import CustomButton from '@/components/CustomButton'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const getSongListDetail = async (id: number): Promise<SongListBasicInfo> => {
    const { playlist } = await SongListRequst.getSongListDetail(id)
    const detail = playlist || []
    return formatSongListBasicInfo(detail)
}

// 歌单 id
const SongListDetail: FC = () => {
    const id = history.location.query?.id
    const [basicInfo, setBasicInfo] = useState<Nullable<SongListBasicInfo>>(null)
    const [lineCount, setLineCount] = useState(0)
    const [isExpand, setExpand] = useState(false)
    const introductionRef = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        getSongListDetail(Number(id)).then(r => setBasicInfo(r))
    }, [])
    useEffect(() => {
        if (introductionRef.current === null) return
        setLineCount(computeLineCount(introductionRef.current))
    }, [basicInfo])
    const expandCollapse = () => {
        setExpand(!isExpand)
    }
    return (
        <div className={'app-container songListDetail'}>
            {basicInfo !== null && (
                <div className='songListDetail-infoContainer'>
                    <img className={'songListDetail-coverPicture'} src={basicInfo.coverPicture + '?param=250y250'} alt='' />
                    <div className='songListDetail-info'>
                        <h1 className='songListDetail-info-title'>{basicInfo.name}</h1>
                        <div className='songListDetail-info-user'>
                            <img
                                className={'songListDetail-info-user-avatar'}
                                src={basicInfo.createUser.avatarUrl + '?param=250y250'}
                                alt=''
                            />
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
                                <CustomButton onClick={expandCollapse} type={'text'}>
                                    {isExpand ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                </CustomButton>
                            )}
                        </div>
                        <div className={'songListDetail-info-action'}>
                            <CustomButton size={'small'} icon={'icon-bofang'} type={'primary'}>
                                播放全部
                            </CustomButton>
                            <CustomButton size={'small'} icon={'icon-shoucang1'} type={'default'}>
                                收藏
                            </CustomButton>
                        </div>
                    </div>
                </div>
            )}
            <Tabs defaultActiveKey='1' tabBarExtraContent={<SearchInput placeholder={'搜索歌单音乐'} />}>
                <TabPane tab='歌曲列表' key='1'>
                    <MusicTable songList={[]} />
                </TabPane>
                <TabPane tab='评论' key='2'></TabPane>
                <TabPane tab='收藏者' key='3'></TabPane>
                <TabPane tab='相似推荐' key='4'></TabPane>
            </Tabs>
        </div>
    )
}

export default SongListDetail
