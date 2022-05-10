import React, { FC, useMemo, useState } from 'react'
import './index.less'
import { Tabs } from 'antd'
import SearchInput from '@/components/Search'
import { SearchRequst } from '@/server/api/search'
import { Search_Params, SearchType } from '@/server/api/search/params'
import SearchPageMuisc from '@/pages/Search/Music'
import { useLocation } from 'umi'
import SearchPageSinger from '@/pages/Search/Singer'
import SearchPageSongList from '@/pages/Search/SongList'
import SearchPageAlbum from '@/pages/Search/Album'
import SearchPageMv from '@/pages/Search/Mv'

const { TabPane } = Tabs

export interface SearchProps {
    keywords: string
}

export interface SearchList {
    total: number
    list: any[]
}

// 获取搜索结果
export const getSearchResults = async (query: Search_Params): Promise<SearchList | undefined> => {
    try {
        const {
            code,
            result: { songs, songCount, artists, artistCount, playlists, playlistCount, albums, albumCount, mvCount, mvs }
        } = await SearchRequst.search(query)
        if (code !== 200) return undefined
        switch (query.type) {
            case SearchType.music:
                return { total: songCount, list: songs }
            case SearchType.singer:
                return { total: artistCount, list: artists }
            case SearchType.songList:
                return { total: playlistCount, list: playlists }
            case SearchType.album:
                return { total: albumCount, list: albums }
            case SearchType.mv:
                return { total: mvCount, list: mvs }
        }
    } catch (e) {
        return { total: 0, list: [] }
    }
}

const SearchPage: FC = () => {
    const location: any = useLocation()
    const [keywords, setKeywords] = useState(location.query.name)
    const [subKeywords, setSubKeywords] = useState(location.query.name)
    const onSearch = (name: string) => {
        setSubKeywords(name)
    }
    useMemo(() => {
        const name = location.query.name
        setKeywords(name)
        setSubKeywords(name)
    }, [location])
    return (
        <div className={'app-container searchPage'}>
            <div className='searchPage-searchBarBox'>
                <SearchInput
                    value={keywords}
                    onChange={value => setKeywords(value)}
                    onSearch={onSearch}
                    className={'searchPage-searchBar'}
                    placeholder={'搜索歌曲、歌手、歌单、Mv'}
                />
            </div>
            <Tabs defaultActiveKey='1'>
                <TabPane tab={'单曲'} key={SearchType.music}>
                    <SearchPageMuisc keywords={subKeywords} />
                </TabPane>
                <TabPane tab={'歌手'} key={SearchType.singer}>
                    <SearchPageSinger keywords={subKeywords} />
                </TabPane>
                <TabPane tab={'歌单'} key={SearchType.songList}>
                    <SearchPageSongList keywords={subKeywords} />
                </TabPane>
                <TabPane tab={'专辑'} key={SearchType.album}>
                    <SearchPageAlbum keywords={subKeywords} />
                </TabPane>
                <TabPane tab={'Mv'} key={SearchType.mv}>
                    <SearchPageMv keywords={subKeywords} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default SearchPage
