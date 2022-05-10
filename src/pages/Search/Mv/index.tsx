import React, { FC, useEffect, useMemo, useState } from 'react'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { getSearchResults, SearchList, SearchProps } from '@/pages/Search'
import { useScroll } from '@/hooks'
import { Pagination } from 'antd'
import MvCard from '@/components/MvCard'
import './index.less'

const SearchPageMv: FC<SearchProps> = ({ keywords }) => {
    const [query, setQuery] = useState<Search_Params>({
        keywords,
        limit: 45,
        page: 1,
        type: SearchType.mv
    })
    const [result, setResult] = useState<SearchList>({ list: [], total: 0 })
    useEffect(() => {
        getSearchResults(query).then(r => r && setResult(r))
    }, [query])
    useMemo(() => {
        setQuery({
            keywords,
            limit: 45,
            page: 1,
            type: SearchType.mv
        })
    }, [keywords])
    const toScroll = useScroll()
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        toScroll(document.querySelector('.layout') as HTMLElement, 0)
    }
    return (
        <>
            <div className={'searchPageMv'}>
                {result.list.map(item => (
                    <MvCard width={'240px'} src={item.cover} key={item.id} title={item.name} />
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

export default SearchPageMv
