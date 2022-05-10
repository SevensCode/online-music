import React, { FC, useCallback, useEffect, useState } from 'react'
import { useClickOnBlankHiddenElement } from '@/hooks'
import { CSSTransition } from 'react-transition-group'
import './index.less'
import { SearchRequst } from '@/server/api/search'
import { STORE_SEARCH_HISTORY } from '@/constants'
import store from 'store'
import SearchInput from '@/components/Search'
import { history } from 'umi'

// 获取热搜
const getHotSearch = async () => {
    const data = await SearchRequst.hotSearch()
    return data?.result?.hots || []
}
const Search: FC = () => {
    const [searchRef, isShow, setShow] = useClickOnBlankHiddenElement<HTMLDivElement>()
    const [hotSearchList, setHotSearchList] = useState<any[]>([])
    const [searchText, setSearchText] = useState<string>('')
    // 搜索历史
    const [searchHistory, setSearchHistory] = useState<string[]>(store.get(STORE_SEARCH_HISTORY) || [])
    const onSearch = useCallback(() => {
        if (!searchText.trim().length) return
        if (!searchHistory.some(value => value === searchText)) {
            setSearchHistory(oldHotSearchList => {
                const searchList = [...oldHotSearchList, searchText]
                store.set(STORE_SEARCH_HISTORY, searchList)
                return searchList
            })
        }
        history.push({
            pathname: '/search',
            query: { name: searchText }
        })
    }, [searchText, searchHistory])
    const clearSearchHistory = useCallback(() => {
        store.set(STORE_SEARCH_HISTORY, [])
        setSearchHistory([])
    }, [])
    useEffect(() => {
        getHotSearch().then(value => setHotSearchList(value))
    }, [])
    const popularSearches = (name: string) => {
        setShow(false)
        history.push({
            pathname: '/search',
            query: { name }
        })
    }
    return (
        <div ref={searchRef} className={'header-search'}>
            <SearchInput
                onFocus={() => setShow(true)}
                placeholder={'搜索歌曲、歌手、歌单、Mv'}
                onSearch={onSearch}
                onChange={value => setSearchText(value)}
            />
            <CSSTransition unmountOnExit in={isShow} classNames='zoomFade' timeout={300}>
                <div className='pullDownList'>
                    <ul className='hotRecommended'>
                        <h3 className={'hotRecommended_title'}>
                            <i className={'iconfont icon-fire hotRecommended_icon'} />
                            热门推荐
                        </h3>
                        {hotSearchList.map((item, index) => (
                            <li key={index} onClick={() => popularSearches(item.first)}>
                                <span className={'hotRecommended_index'}>{index + 1}</span>
                                <p className={'hotRecommented_name'}>{item.first}</p>
                            </li>
                        ))}
                    </ul>
                    <div className='searchHistory'>
                        <h3 className={'searchHistory_title'}>
                            <span>搜索历史</span>
                            <span onClick={clearSearchHistory}>
                                清空 <i className={'iconfont icon-top searchHistory_icon'} />
                            </span>
                        </h3>
                        <div className={'searchHistory_list'}>
                            {searchHistory.map((item, index) => (
                                <span key={index} className={'searchHistory_item'}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Search
