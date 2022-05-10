import React, { FC, useEffect, useMemo, useState } from 'react'
import { getSearchResults, SearchList, SearchProps } from '@/pages/Search'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { useScroll } from '@/hooks'
import './index.less'
import { Pagination } from 'antd'
import SongListCard from '@/components/SongListCard'
import { history } from 'umi'

const SearchPageSongList: FC<SearchProps> = ({ keywords }) => {
    const [query, setQuery] = useState<Search_Params>({
        keywords,
        limit: 48,
        page: 1,
        type: SearchType.songList
    })
    const [result, setResult] = useState<SearchList>({ list: [], total: 0 })
    useEffect(() => {
        getSearchResults(query).then(r => r && setResult(r))
    }, [query])
    useMemo(() => {
        setQuery({
            keywords,
            limit: 48,
            page: 1,
            type: SearchType.songList
        })
    }, [keywords])
    const toScroll = useScroll()
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        toScroll(document.querySelector('.layout') as HTMLElement, 0)
    }
    return (
        <>
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

export default SearchPageSongList
