import React, { FC, useEffect, useRef, useState } from 'react'
import './index.less'
import { history } from 'umi'
import { SongListRequst } from '@/server/api/songList'
import { formatMusicDetail, formatSongListDetail } from '@/utils/detailFormatting'
import { SongList, SongListDetail } from '@/types/songList'
import { Skeleton, Tabs } from 'antd'
import SearchInput from '@/components/Search'
import MusicTable from '@/components/MusicTable/index'
import { MusicRequest } from '@/server/api/music'
import { MusicDetail } from '@/types/music'
import { useScroll } from '@/hooks'
import SongListBasicInfo from '@/pages/Details/SongList/BasicInfo'
import { Comment_Resource_Type } from '@/server/api/other/params'
import { Request_Comment_Params } from '@/server/api/common'
import CommentPage, { CommentResponseData } from '@/pages/Common/Comment'

const { TabPane } = Tabs
// 获取音乐详情
const getMusicDetails = async (ids: string): Promise<MusicDetail[]> => {
    const { songs } = await MusicRequest.getDetails(ids)
    const arr = songs || []
    return arr.map((musicDetail: any) => formatMusicDetail(musicDetail))
}
// 获取歌单详情
const getSongListDetail = async (id: number): Promise<SongListDetail> => {
    const { playlist } = await SongListRequst.getDetail(id)
    return formatSongListDetail(playlist || {})
}
// 获取评论
const getSongListComment = async (query: Request_Comment_Params): Promise<CommentResponseData> => {
    const { hotComments, comments, total } = await SongListRequst.getComments(query)
    return { hotComments: hotComments || [], comments: comments || [], total }
}

// 歌单 id
const SongListDetailPage: FC = () => {
    const id = history.location.query?.id
    const infoContainer = useRef<HTMLDivElement>(null)
    const [basicInfo, setBasicInfo] = useState<Nullable<SongListDetail>>(null)
    const [loading, setLoading] = useState(false)
    const [songList, setSongList] = useState<SongList>({ id: Number(id), list: [] })
    // 记录一份歌曲列表，搜索时用
    const songListRef = useRef<SongList>(songList)
    const toScroll = useScroll()
    const [activeKey, setActiveKey] = useState('1')
    useEffect(() => {
        getSongListDetail(Number(id)).then(async r => {
            setBasicInfo(r)
            setLoading(true)
            const list = await getMusicDetails(r.musicId.join(',')).finally(() => setLoading(false))
            setSongList({ id: Number(id), list })
            songListRef.current = { id: Number(id), list }
        })
    }, [])

    const onChangePage = () => {
        if (infoContainer.current === null) return
        toScroll(document.querySelector('.layout') as HTMLElement, infoContainer.current.offsetHeight + 15, 800)
    }
    const updateBasicInfo = async () => {
        setBasicInfo((await getSongListDetail(Number(id))) || {})
    }
    // 搜索
    const onSearch = (value: string) => {
        setSongList({
            id: Number(id),
            list: songListRef.current.list.filter(item => item.name.includes(value.trim()))
        })
    }
    const onChangeTabs = (key: string) => {
        setActiveKey(key)
    }
    const layoutElement = document.querySelector('.layout') as HTMLElement
    return (
        <div className={'app-container songListDetail'}>
            {basicInfo !== null ? (
                <SongListBasicInfo
                    updateBasicInfo={updateBasicInfo}
                    basicInfoRef={infoContainer}
                    songList={songList}
                    basicInfo={basicInfo}
                />
            ) : (
                <div className={'songListDetail-skeleton'}>
                    <Skeleton.Image style={{ width: 250, height: 250 }} />
                    <Skeleton active></Skeleton>
                </div>
            )}

            <Tabs
                activeKey={activeKey}
                onChange={onChangeTabs}
                defaultActiveKey='1'
                tabBarExtraContent={activeKey === '1' ? <SearchInput onSearch={onSearch} placeholder={'搜索歌单音乐'} /> : undefined}>
                <TabPane tab='歌曲列表' key='1'>
                    <MusicTable onChangePage={onChangePage} loading={loading} songList={songList} />
                </TabPane>
                <TabPane tab={`评论(${basicInfo?.commentCount})`} key='2'>
                    <CommentPage
                        id={Number(id)}
                        scrollContainer={layoutElement}
                        resourceType={Comment_Resource_Type.songList}
                        getComment={getSongListComment}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default SongListDetailPage
