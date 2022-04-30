import React, { FC, useEffect, useRef, useState } from 'react'
import './index.less'
import { history } from 'umi'
import { SongListRequst } from '@/server/api/songList'
import { formatMusicDetail, formatSongListDetail } from '@/utils/objectFormatting'
import { SongList, SongListDetail } from '@/types/songList'
import { Tabs } from 'antd'
import SearchInput from '@/components/Search'
import MusicTable from '@/components/MusicTable/index'
import { MusicRequest } from '@/server/api/music'
import { MusicDetail } from '@/types/music'
import { useScroll } from '@/hooks'
import SongListBasicInfo from '@/pages/Details/SongList/BasicInfo'
import SongListComment from '@/pages/Details/SongList/Comment'

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
        switch (key) {
            case '1':
                break
            case '2':
                break
        }
    }
    return (
        <div className={'app-container songListDetail'}>
            {basicInfo !== null && (
                <SongListBasicInfo
                    updateBasicInfo={updateBasicInfo}
                    basicInfoRef={infoContainer}
                    songList={songList}
                    basicInfo={basicInfo}
                />
            )}
            <Tabs
                defaultActiveKey='1'
                onChange={onChangeTabs}
                tabBarExtraContent={<SearchInput onSearch={onSearch} placeholder={'搜索歌单音乐'} />}>
                <TabPane tab='歌曲列表' key='1'>
                    <MusicTable onChangePage={onChangePage} loading={loading} songList={songList} />
                </TabPane>
                <TabPane tab={`评论(${basicInfo?.commentCount})`} key='2'>
                    <SongListComment id={Number(id)} />
                </TabPane>
                <TabPane tab='收藏者' key='3'></TabPane>
                <TabPane tab='相似推荐' key='4'></TabPane>
            </Tabs>
        </div>
    )
}

export default SongListDetailPage
