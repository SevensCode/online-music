import React, { FC, FocusEvent } from 'react'
import { useClickOnBlankHiddenElement } from '@/hooks'
import { CSSTransition } from 'react-transition-group'
import './index.less'

const Search: FC = () => {
    const [searchRef, isShow, setShow] = useClickOnBlankHiddenElement<HTMLDivElement>()
    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        // e.nativeEvent.stopPropagation()
        setShow(true)
    }
    return (
        <div ref={ searchRef } className={ 'header-search' }>
            <input type="text" onFocus={ onFocus } placeholder={ '搜索歌曲、歌手、Mv' }/>
            <i className={ 'iconfont icon-sousuo search_icon' }/>
            <CSSTransition unmountOnExit in={ isShow } classNames="zoomFade" timeout={ 300 }>
                <div className="pullDownList">
                    <ul className="hotRecommended">
                        <h3 className={ 'hotRecommended_title' }><i
                            className={ 'iconfont icon-fire hotRecommended_icon' }/>热门推荐 </h3>
                        <li><span className={ 'hotRecommended_index' }>1</span><p
                            className={ 'hotRecommented_name' }>周杰伦</p></li>
                        <li><span className={ 'hotRecommended_index' }>2</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>3</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>4</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>5</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>6</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>7</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>8</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>9</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                        <li><span className={ 'hotRecommended_index' }>10</span><p
                            className={ 'hotRecommented_name' }>大苏打是打赏</p></li>
                    </ul>
                    <div className="searchHistory">
                        <h3 className={ 'searchHistory_title' }><span>搜索历史</span><span>清空 <i
                            className={ 'iconfont icon-top searchHistory_icon' }/></span></h3>
                        <div className={ 'searchHistory_list' }>
                            <span className={ 'searchHistory_item' }>周杰伦</span>
                            <span className={ 'searchHistory_item' }>sS ad a as </span>
                            <span className={ 'searchHistory_item' }>5161</span>
                            <span className={ 'searchHistory_item' }>5161</span>
                            <span className={ 'searchHistory_item' }>s撒旦阿斯顿撒是</span>
                            <span className={ 'searchHistory_item' }>5161</span>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Search