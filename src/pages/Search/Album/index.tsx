import React, { FC, useEffect, useMemo, useState } from 'react'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { getSearchResults, SearchList, SearchProps } from '@/pages/Search'
import { useScroll } from '@/hooks'
import { Pagination } from 'antd'
import AlbumCard from '@/components/AlbumCard'
import './index.less'

const SearchPageAlbum: FC<SearchProps> = ({ keywords }) => {
    const [query, setQuery] = useState<Search_Params>({
        keywords,
        limit: 48,
        page: 1,
        type: SearchType.album
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
            type: SearchType.album
        })
    }, [keywords])
    const toScroll = useScroll()
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        toScroll(document.querySelector('.layout') as HTMLElement, 0)
    }
    return (
        <>
            <div className={'searchPageAlbum'}>
                {result.list.map(item => (
                    <AlbumCard src={item.picUrl} key={item.id} title={item.name} type={item.type} />
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

export default SearchPageAlbum
