import React, { FC } from 'react'
import './index.less'
import { KeepAlive } from 'umi'
import NewMusics from '@/pages/Find/components/NewMusics'
import FindBanner from '@/pages/Find/components/Banner'
import RecommendedPlaylist from '@/pages/Find/components/RecommendedPlaylist'
import ExclusiveBroadcast from '@/pages/Find/components/ExclusiveBroadcast'
import HotSinger from '@/pages/Find/components/HotSinger'

const Find: FC = () => {
    return (
        <div className='find app-container'>
            {/*轮播图*/}
            <FindBanner />
            <h3 className={'module-title'}>推荐歌单</h3>
            <RecommendedPlaylist />
            <h3 className={'module-title'}>独家放送</h3>
            <ExclusiveBroadcast />
            <h3 className={'module-title'}>新音乐推送</h3>
            <NewMusics />
            <h3 className={'module-title'}>热门歌手</h3>
            <HotSinger />
        </div>
    )
}
export default () => (
    // @ts-ignore
    <KeepAlive name={'find'} when={true}>
        <Find />
    </KeepAlive>
)
