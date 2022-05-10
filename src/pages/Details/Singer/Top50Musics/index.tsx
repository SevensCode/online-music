import React, { useEffect, useState } from 'react'
import MusicTable from '@/components/MusicTable'
import { MusicDetail } from '@/types/music'
import { SingerRequst } from '@/server/api/singer'
import { formatMusicDetail } from '@/utils/detailFormatting'
import { useLocation } from 'umi'
// 获取热门50首音乐
const getTop50Music = async (id: number) => {
    const { songs } = await SingerRequst.getTop50Musics(id)
    const arr = songs || []
    return arr.map((item: any) => formatMusicDetail(item))
}
const Top50Musics = () => {
    const [top50Musics, setTop50Musics] = useState<MusicDetail[]>([])
    const history: any = useLocation()
    useEffect(() => {
        getTop50Music(history.query.id).then(value => {
            setTop50Musics(value)
        })
    }, [history])
    return <MusicTable songList={{ id: 0, list: top50Musics }} />
}

export default Top50Musics
