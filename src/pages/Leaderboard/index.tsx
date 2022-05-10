import React, { FC, useEffect, useState } from 'react'
import { history, KeepAlive } from '@@/core/umiExports'
import { SongListRequst } from '@/server/api/songList'
import SongListCard from '@/components/SongListCard'
import { numberUnit } from '@/utils/tool'
import './index.less'
import { SongListDetail } from '@/types/songList'
import { formatSongListDetail } from '@/utils/detailFormatting'

const getLeaderboard = async (): Promise<SongListDetail[]> => {
    const { list } = await SongListRequst.getLeaderboard()
    const arr = list || []
    return arr.map((item: any) => formatSongListDetail(item))
}
const Leaderboard: FC = () => {
    // 官方榜
    const [officialList, setOfficialList] = useState<SongListDetail[]>([])
    // 全球榜
    const [globalList, setGlobalList] = useState<SongListDetail[]>([])
    useEffect(() => {
        getLeaderboard().then(list => {
            setOfficialList(list.filter((item, i) => i <= 3))
            setGlobalList(list.filter((item, i) => i > 3))
        })
    }, [])
    const onClick = (id: string) => {
        history.push({
            pathname: '/songListDetail',
            query: { id }
        })
    }
    return (
        <div className={'app-container leaderboard'}>
            <h3 className={'module-title'}>官方榜</h3>
            <div className='leaderboard-grid'>
                {officialList.map(({ name, coverPicture, playCount, id }) => (
                    <SongListCard
                        title={name}
                        key={id}
                        onClick={() => onClick(String(id))}
                        width={'190px'}
                        src={coverPicture}
                        count={numberUnit(playCount)}
                    />
                ))}
            </div>
            <h3 className={'module-title'}>全球榜</h3>
            <div className='leaderboard-grid'>
                {globalList.map(({ name, coverPicture, playCount, id }) => (
                    <SongListCard
                        title={name}
                        key={id}
                        onClick={() => onClick(String(id))}
                        width={'190px'}
                        src={coverPicture}
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
