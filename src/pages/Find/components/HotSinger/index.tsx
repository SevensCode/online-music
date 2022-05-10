import React, { useEffect, useState } from 'react'
import { SingerRequst } from '@/server/api/singer'
import SingerCard from '@/components/SingerCard'
import { history } from 'umi'
// 获取热门歌手
const getHotSingers = async () => {
    const { artists } = await SingerRequst.hotSingers({ limit: 30, page: 1 })
    return artists || []
}
const HotSinger = () => {
    // 热门歌手
    const [hotSingerList, setHotSingers] = useState<any[]>([])
    useEffect(() => {
        getHotSingers().then(value => setHotSingers(value))
    }, [])
    return (
        <div className={'find-hotSingers-container'}>
            {hotSingerList.map(({ id, name, picUrl }) => (
                <SingerCard
                    onClick={() =>
                        history.push({
                            pathname: '/singerDetail',
                            query: { id }
                        })
                    }
                    name={name}
                    src={picUrl}
                    width={'190px'}
                    key={id}
                />
            ))}
        </div>
    )
}

export default HotSinger
