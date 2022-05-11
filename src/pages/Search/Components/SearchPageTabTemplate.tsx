import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { SearchRequst } from '@/server/api/search'
import { useScroll } from '@/hooks'
import { Pagination } from 'antd'

export interface SearchList {
    total: number
    list: any[]
}

// 获取搜索结果
const getSearchResults = async (query: Search_Params): Promise<SearchList | undefined> => {
    try {
        const {
            code,
            result: { songs, songCount, artists, artistCount, playlists, playlistCount, albums, albumCount, mvCount, mvs }
        } = await SearchRequst.search(query)
        if (code !== 200) return undefined
        switch (query.type) {
            case SearchType.music:
                return { total: songCount, list: songs || [] }
            case SearchType.singer:
                return { total: artistCount, list: artists || [] }
            case SearchType.songList:
                return { total: playlistCount, list: playlists || [] }
            case SearchType.album:
                return { total: albumCount, list: albums || [] }
            case SearchType.mv:
                return { total: mvCount, list: mvs || [] }
        }
    } catch (e) {
        return { total: 0, list: [] }
    }
}

export interface SearchProps {
    keywords: string
    type: SearchType
    limit: number

    render(result: SearchList): ReactNode
}

const SearchPageTabTemplate: FC<SearchProps> = ({ keywords, type, render, limit }) => {
    const [query, setQuery] = useState<Search_Params>({
        keywords,
        limit,
        page: 1,
        type: type
    })
    const [result, setResult] = useState<SearchList>({ list: [], total: 0 })
    useEffect(() => {
        getSearchResults(query).then(r => r && setResult(r))
    }, [query])
    useMemo(() => {
        setQuery({
            keywords,
            limit,
            page: 1,
            type: type
        })
    }, [keywords])
    const toScroll = useScroll()
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        toScroll(document.querySelector('.layout') as HTMLElement, 0)
    }
    return (
        <>
            {render(result)}
            <div className='center-container'>
                <Pagination
                    hideOnSinglePage={true}
                    onChange={onPageChange}
                    current={query.page}
                    defaultCurrent={query.page}
                    pageSize={query.limit}
                    showSizeChanger={false}
                    total={result.total}
                />
            </div>
        </>
    )
}

export default SearchPageTabTemplate
