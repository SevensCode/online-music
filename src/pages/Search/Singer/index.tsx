import React, { FC, useEffect, useMemo, useState } from 'react'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { getSearchResults, SearchList, SearchProps } from '@/pages/Search'
import SingerCard from '@/components/SingerCard'
import './index.less'
import { Pagination } from 'antd'
import { useScroll } from '@/hooks'
import { history } from 'umi'

const SearchPageSinger: FC<SearchProps> = ({ keywords }) => {
    const [query, setQuery] = useState<Search_Params>({
        keywords,
        limit: 48,
        page: 1,
        type: SearchType.singer
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
            type: SearchType.singer
        })
    }, [keywords])
    const toScroll = useScroll()
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        toScroll(document.querySelector('.layout') as HTMLElement, 0)
    }
    return (
        <>
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

export default SearchPageSinger
