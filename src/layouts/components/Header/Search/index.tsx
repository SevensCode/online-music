import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useClickOnBlankHiddenElement } from '@/hooks';
import { CSSTransition } from 'react-transition-group';
import './index.less';
import { SearchRequst } from '@/api/search';
import { STORE_SEARCH_HISTORY } from '@/constants';
import store from 'store';

// 获取热搜
const getHotSearch = async () => {
    const {
        result: { hots },
    } = await SearchRequst.hotSearch();
    return hots || [];
};
const Search: FC = () => {
    const [searchRef, isShow, setShow] =
        useClickOnBlankHiddenElement<HTMLDivElement>();
    const [hotSearchList, setHotSearchList] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    // 搜索历史
    const [searchHistory, setSearchHistory] = useState<string[]>(
        store.get(STORE_SEARCH_HISTORY) || [],
    );
    const onSearch = useCallback(() => {
        if (!searchHistory.some((value) => value === searchText)) {
            setSearchHistory((oldHotSearchList) => {
                const searchList = [...oldHotSearchList, searchText];
                store.set(STORE_SEARCH_HISTORY, searchList);
                return searchList;
            });
        }
    }, [searchText, searchHistory]);
    const clearSearchHistory = useCallback(() => {
        store.set(STORE_SEARCH_HISTORY, []);
        setSearchHistory([]);
    }, []);
    useEffect(() => {
        getHotSearch().then((value) => setHotSearchList(value));
    }, []);
    return (
        <div ref={searchRef} className={'header-search'}>
            <input
                type="text"
                onKeyDown={(e) => e.code === 'Enter' && onSearch()}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchText(e.target.value)
                }
                onFocus={() => setShow(true)}
                placeholder={'搜索歌曲、歌手、Mv'}
            />
            <i
                onClick={onSearch}
                className={'iconfont icon-sousuo search_icon'}
            />
            <CSSTransition
                unmountOnExit
                in={isShow}
                classNames="zoomFade"
                timeout={300}
            >
                <div className="pullDownList">
                    <ul className="hotRecommended">
                        <h3 className={'hotRecommended_title'}>
                            <i
                                className={
                                    'iconfont icon-fire hotRecommended_icon'
                                }
                            />
                            热门推荐
                        </h3>
                        {hotSearchList.map((item, index) => (
                            <li key={index}>
                                <span className={'hotRecommended_index'}>
                                    {index + 1}
                                </span>
                                <p className={'hotRecommented_name'}>
                                    {item.first}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="searchHistory">
                        <h3 className={'searchHistory_title'}>
                            <span>搜索历史</span>
                            <span onClick={clearSearchHistory}>
                                清空{' '}
                                <i
                                    className={
                                        'iconfont icon-top searchHistory_icon'
                                    }
                                />
                            </span>
                        </h3>
                        <div className={'searchHistory_list'}>
                            {searchHistory.map((item, index) => (
                                <span
                                    key={index}
                                    className={'searchHistory_item'}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Search;
