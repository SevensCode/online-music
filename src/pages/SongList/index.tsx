import React, { FC, useEffect, useState } from 'react'
import { KeepAlive, useActivate } from '@@/core/umiExports'
import { history } from 'umi'
import './index.less'
import { SongListRequst } from '@/server/api/songList'
import CustomButton from '@/components/CustomButton'
import { CSSTransition } from 'react-transition-group'
import { SongList_GetSongList_Params } from '@/server/api/songList/params'
import { SongListDetail } from '@/types/songList'
import SongListCard from '@/components/SongListCard'
import { Pagination } from 'antd'
import { useScroll } from '@/hooks'
import { formatSongListDetail } from '@/utils/objectFormatting'

// const { numberUnit } = require('@/utils/tool')
import { numberUnit } from '@/utils/tool'
// 获取热门歌单分类
const getPopularPlaylistCategories = async () => {
    const { tags } = await SongListRequst.getPopularCategory()
    return tags || []
}

// 获取歌单分类
const getPlaylistCategory = async () => {
    const { categories, sub, all, code } = await SongListRequst.getCategory()
    if (code !== 200) return undefined
    return { categories, sub, all }
}

// 歌单
const getSongList = async (query: SongList_GetSongList_Params): Promise<{ songList: SongListDetail[]; total: number }> => {
    const { playlists, total } = await SongListRequst.getSongList(query)
    const songList = playlists || []
    return {
        songList: songList.map((item: any) => formatSongListDetail(item)),
        total
    }
}
const SongList: FC = () => {
    // 热门歌单分类
    const [hotCategoryList, setHotCategoryList] = useState<any[]>([])
    // 全都歌单分类
    const [categoryList, setCategoryList] = useState<any[]>([])
    // 分类是否可见
    const [categoryVisible, setCategoryVisible] = useState(false)
    // 歌单
    const [sontList, setSongList] = useState<SongListDetail[]>([])
    // 歌单请求参数
    const [query, setQuery] = useState<SongList_GetSongList_Params>({
        cat: (history.location.query?.tag || '全部歌单') as string,
        limit: 42,
        page: 1
    })
    // const lastTag
    const [total, setTotal] = useState<number>(0)
    const toScroll = useScroll()
    useActivate(() => {
        setQuery({ ...query, cat: (history.location.query?.tag || '全部歌单') as string })
    })
    useEffect(() => {
        // 获取热门歌单分类
        getPopularPlaylistCategories().then(r => setHotCategoryList(r))
        // 获取歌单分类
        getPlaylistCategory().then(r => {
            if (r === undefined) return
            const { categories, sub } = r
            const category = Object.keys(categories).map(key => {
                return {
                    name: categories[key],
                    list: sub.filter((item: any) => item.category === Number(key))
                }
            })
            setCategoryList(category)
        })
    }, [])
    const setSongListType = (type: string) => {
        setQuery({ ...query, cat: type, page: 1 })
    }
    const onPageChange = (page: number, limit: number) => {
        setQuery({ ...query, page })
        const layout = document.querySelector('.layout') as HTMLElement
        layout && toScroll(layout, 0, 500)
    }
    useEffect(() => {
        // 获取歌单
        getSongList(query).then(r => {
            setTotal(r.total)
            setSongList(r.songList)
        })
    }, [query])
    const onClick = (id: string) => {
        history.push({
            pathname: '/songListDetail',
            query: { id }
        })
    }
    return (
        <div className={'songList app-container'}>
            <div className='songList-category'>
                <CustomButton
                    type={'primary'}
                    size={'small'}
                    icon={'iconfont icon-ico-'}
                    onClick={() => setCategoryVisible(!categoryVisible)}>
                    {query.cat || '全部歌单'}
                </CustomButton>
                <div className='songList-category-tags'>
                    <CustomButton
                        type={'text'}
                        onClick={() => setSongListType('全部歌单')}
                        className={query.cat === '全部歌单' ? 'active' : ''}
                        size={'small'}>
                        全部歌单
                    </CustomButton>
                    {hotCategoryList.map(({ id, name }) => (
                        <CustomButton
                            key={id}
                            type={'text'}
                            onClick={() => setSongListType(name)}
                            className={query.cat === name ? 'active' : ''}
                            size={'small'}>
                            {name}
                        </CustomButton>
                    ))}
                </div>
                <CSSTransition unmountOnExit in={categoryVisible} classNames='zoomFade' timeout={300}>
                    <div className='songList-allCategory'>
                        {categoryList.map((item, i) => (
                            <div className='songList-allCategory-item' key={i}>
                                <div className='songList-allCategory-title'>{item.name}：</div>
                                <div className={'songList-allCategory-list'}>
                                    {item.list.map((tag: any) => (
                                        <CustomButton
                                            type={'text'}
                                            className={query.cat === tag.name ? 'active' : ''}
                                            key={tag.name}
                                            onClick={() => setSongListType(tag.name)}
                                            size={'small'}>
                                            {tag.name}
                                            {tag.hot && <sup className={'hot-sup'}>hot</sup>}
                                        </CustomButton>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CSSTransition>
            </div>
            <div className={'songList-list'}>
                {sontList.map(item => (
                    <SongListCard
                        title={item.name}
                        key={item.id}
                        width={'190px'}
                        onClick={() => onClick(String(item.id))}
                        userName={item.createUser.nickname}
                        src={item.coverPicture + '?param=250y250'}
                        count={numberUnit(item.playCount)}></SongListCard>
                ))}
            </div>
            <div className='center-container'>
                <Pagination
                    hideOnSinglePage={true}
                    onChange={onPageChange}
                    current={query.page}
                    defaultCurrent={query.page}
                    pageSize={query.limit}
                    showSizeChanger={false}
                    total={total}
                />
            </div>
        </div>
    )
}

export default () => (
    // @ts-ignore
    <KeepAlive name={'songList'} when={true}>
        <SongList />
    </KeepAlive>
)
