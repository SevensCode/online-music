import React, { useEffect, useState } from 'react'
import { Album_GetSingerAlbum_Params } from '@/server/api/album/params'
import { AlbumRequest } from '@/server/api/album'
import { history } from 'umi'
import { formatAlbumDetail } from '@/utils/detailFormatting'
import { AlbumDetail } from '@/types/album'
import AlbumCard from '@/components/AlbumCard'
import './index.less'
import CustomButton from '@/components/CustomButton'
import { CaretDownOutlined } from '@ant-design/icons'
// 获取专辑列表
const getAlbum = async (query: Album_GetSingerAlbum_Params) => {
    const { hotAlbums, more } = await AlbumRequest.getSingerAlbum(query)
    const arr = hotAlbums || []
    return { list: arr.map((item: any) => formatAlbumDetail(item)), more }
}
const SingerDetailAlbumList = () => {
    const [query, setQuery] = useState<Album_GetSingerAlbum_Params>({
        page: 1,
        limit: 30,
        id: Number(history.location.query?.id)
    })
    const [albumList, setAlbumList] = useState<AlbumDetail[]>([])
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getAlbum(query).then(value => {
            setAlbumList(query.page === 1 ? value.list : [...albumList, ...value.list])
            setMore(value.more)
            setLoading(false)
        })
    }, [query])
    useEffect(() => {
        setQuery({
            page: 1,
            limit: 30,
            id: Number(history.location.query?.id)
        })
        setMore(false)
        setLoading(false)
    }, [history.location.query])
    const loadMore = () => {
        setQuery({ ...query, page: query.page + 1 })
    }
    return (
        <div>
            <div className={'album-container'}>
                {albumList.map(item => (
                    <AlbumCard key={item.id} src={item.coverPicture} title={item.name} type={item.subType} width={'190px'} />
                ))}
            </div>
            {more && (
                <div className={'center-container'}>
                    <CustomButton onClick={loadMore} loading={loading} size={'small'} type={'primary'}>
                        加载更多 <CaretDownOutlined />
                    </CustomButton>
                </div>
            )}
        </div>
    )
}

export default SingerDetailAlbumList
