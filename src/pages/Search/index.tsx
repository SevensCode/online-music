import React, { FC, useMemo, useState } from 'react'
import './index.less'
import { Tabs } from 'antd'
import SearchInput from '@/components/Search'
import { SearchRequst } from '@/server/api/search'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { useLocation } from 'umi'
import SearchPageTabTemplate from '@/pages/Search/Components/SearchPageTabTemplate'
import SingerCard from '@/components/SingerCard'
import { history } from '@@/core/history'
import Tags from '@/components/Tags'
import dateTool from '@/utils/dateTool'
import Like from '@/components/Like'
import SongListCard from '@/components/SongListCard'
import AlbumCard from '@/components/AlbumCard'
import MvCard from '@/components/MvCard'
import { useRecoilValue } from 'recoil'
import { music_detail } from '@/recoil/muisc'
import { MusicRequest } from '@/server/api/music'
import { formatMusicDetail } from '@/utils/detailFormatting'
import { useAudio } from '@/hooks/audio'

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
    const musicDetail = useRecoilValue(music_detail)
    const audio = useAudio()
    const doubleTapToPlay = async (id: number) => {
        if (musicDetail?.id === id) return
        const { code, songs } = await MusicRequest.getDetails(String(id))
        if (code !== 200) return
        audio.audioPlay(formatMusicDetail(songs[0]))
    }
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
                    <SearchPageTabTemplate
                        keywords={subKeywords}
                        type={SearchType.music}
                        limit={50}
                        render={result => (
                            <ul className={'searchPageMuisc'}>
                                {result.list.map(item => (
                                    <li
                                        onDoubleClick={() => doubleTapToPlay(item.id)}
                                        key={item.id}
                                        className={['searchPageMuisc-item'].join(' ')}>
                                        <span className={'searchPageMuisc-name'}>{item.name}</span>
                                        <span className={'searchPageMuisc-auther'}>
                                            <Tags
                                                tags={item.artists}
                                                onClick={(name, id) =>
                                                    history.push({
                                                        pathname: '/singerDetail',
                                                        query: { id: String(id) }
                                                    })
                                                }
                                            />
                                        </span>
                                        <span className={'searchPageMuisc-album'}>《{item.album.name}》</span>
                                        <span className={'searchPageMuisc-duration'}>{dateTool(item.duration).format('mm:ss')}</span>
                                        <Like id={item.id} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    />
                </TabPane>
                <TabPane tab={'歌手'} key={SearchType.singer}>
                    <SearchPageTabTemplate
                        keywords={subKeywords}
                        type={SearchType.singer}
                        limit={48}
                        render={result => (
                            <div className={'searchPageSinger'}>
                                {result.list.map(item => (
                                    <SingerCard
                                        onClick={() =>
                                            history.push({
                                                pathname: '/singerDetail',
                                                query: { id: item.id }
                                            })
                                        }
                                        src={item.img1v1Url}
                                        name={item.name}
                                        width={'190px'}
                                        key={item.id}
                                    />
                                ))}
                            </div>
                        )}
                    />
                </TabPane>
                <TabPane tab={'歌单'} key={SearchType.songList}>
                    <SearchPageTabTemplate
                        keywords={subKeywords}
                        type={SearchType.songList}
                        limit={48}
                        render={result => (
                            <div className={'searchPageSongList'}>
                                {result.list.map(item => (
                                    <SongListCard
                                        onClick={() =>
                                            history.push({
                                                pathname: '/songListDetail',
                                                query: { id: item.id }
                                            })
                                        }
                                        key={item.id}
                                        title={item.name}
                                        src={item.coverImgUrl}
                                        count={item.playCount}
                                    />
                                ))}
                            </div>
                        )}
                    />
                </TabPane>
                <TabPane tab={'专辑'} key={SearchType.album}>
                    <SearchPageTabTemplate
                        keywords={subKeywords}
                        type={SearchType.album}
                        limit={48}
                        render={result => (
                            <div className={'searchPageAlbum'}>
                                {result.list.map(item => (
                                    <AlbumCard src={item.picUrl} key={item.id} title={item.name} type={item.type} />
                                ))}
                            </div>
                        )}
                    />
                </TabPane>
                <TabPane tab={'Mv'} key={SearchType.mv}>
                    <SearchPageTabTemplate
                        keywords={subKeywords}
                        type={SearchType.mv}
                        limit={45}
                        render={result => (
                            <div className={'searchPageMv'}>
                                {result.list.map(item => (
                                    <MvCard width={'240px'} src={item.cover} key={item.id} title={item.name} />
                                ))}
                            </div>
                        )}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default SearchPage
