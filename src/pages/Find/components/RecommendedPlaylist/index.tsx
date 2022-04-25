// 获取推荐歌单
import { SongListRequst } from '@/server/api/songList'
import React, { useEffect, useState } from 'react'
import SongListCard from '@/components/SongListCard'
import { numberUnit } from '@/utils'
import { history } from 'umi'

const getRecommendedPlaylist = async () => {
    const { result } = await SongListRequst.getRecommendedPlaylist()
    return result || []
}
const RecommendedPlaylist = () => {
    // 推荐歌单列表
    const [songList, setSongList] = useState<any[]>([])
    useEffect(() => {
        getRecommendedPlaylist().then((value) => setSongList(value))
    }, [])
    const onClick = (id: string) => {
        history.push({
            pathname: '/songListDetail',
            query: { id }
        })
    }
    return (
        <div className='find-recommendedPlaylist-container'>
            {songList.map(({ id, name, picUrl, playCount }) => (
                <SongListCard
                    key={id}
                    onClick={() => onClick(id)}
                    title={name}
                    src={picUrl + '?param=250y250'}
                    width={'190px'}
                    count={numberUnit(playCount)}
                />
            ))}
        </div>
    )
}

export default RecommendedPlaylist
