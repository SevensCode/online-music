import React, { FC, useEffect, useState } from 'react'
import { KeepAlive } from '@@/core/umiExports'
import { SongListRequst } from '@/server/api/songList'
import SongListCard from '@/components/SongListCard'
import { numberUnit } from '@/utils'
import './index.less'

const getLeaderboard = async () => {
    const { list } = await SongListRequst.getLeaderboard()
    return list || []
}
const Leaderboard: FC = () => {
    // 官方榜
    const [officialList, setOfficialList] = useState<any[]>([])
    // 全球榜
    const [globalList, setGlobalList] = useState<any[]>([])
    useEffect(() => {
        getLeaderboard().then((list) => {
            setOfficialList(list.filter((item: any, i: number) => i <= 3))
            setGlobalList(list.filter((item: any, i: number) => i > 3))
        })
    }, [])
    return (
        <div className={'app-container leaderboard'}>
            <h3 className={'module-title'}>官方榜</h3>
            <div className='leaderboard-grid'>
                {officialList.map(({ name, coverImgUrl, playCount, id }) => (
                    <SongListCard
                        title={name}
                        key={id}
                        width={'190px'}
                        src={coverImgUrl + '?param=250y250'}
                        count={numberUnit(playCount)}
                    />
                ))}
            </div>
            <h3 className={'module-title'}>全球榜</h3>
            <div className='leaderboard-grid'>
                {globalList.map(({ name, coverImgUrl, playCount, id }) => (
                    <SongListCard
                        title={name}
                        key={id}
                        width={'190px'}
                        src={coverImgUrl + '?param=250y250'}
                        count={numberUnit(playCount)}
                    />
                ))}
            </div>
        </div>
    )
}

export default () => {
    return (
        // @ts-ignore
        <KeepAlive name={'leaderboard'} when={true}>
            <Leaderboard />
        </KeepAlive>
    )
}
