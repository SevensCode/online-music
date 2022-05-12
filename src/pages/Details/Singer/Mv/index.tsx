import React, { FC, useEffect, useState } from 'react'
import { Mv_GetSingerMv_Params } from '@/server/api/mv/params'
import { MvRequst } from '@/server/api/mv'
import { MvDetail } from '@/types/mv'
import CustomButton from '@/components/CustomButton'
import { CaretDownOutlined } from '@ant-design/icons'
import MvCard from '@/components/MvCard'
import './index.less'
import { useLocation } from 'umi'

const getSingerMv = async (query: Mv_GetSingerMv_Params): Promise<{ list: MvDetail[]; more: boolean }> => {
    const { mvs, hasMore } = await MvRequst.getSingerMv(query)
    return { list: mvs, more: hasMore }
}
const SingerDetailMvList: FC = () => {
    const location: any = useLocation()
    const [query, setQuery] = useState<Mv_GetSingerMv_Params>({
        page: 1,
        limit: 30,
        id: location.query.id
    })
    const [mvList, setMvList] = useState<MvDetail[]>([])
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getSingerMv(query).then(value => {
            setMvList(query.page === 1 ? value.list : [...mvList, ...value.list])
            setMore(value.more)
            setLoading(false)
        })
    }, [query])
    useEffect(() => {
        setQuery({
            page: 1,
            limit: 30,
            id: location.query.id
        })
        setMore(false)
        setLoading(false)
    }, [location])
    const loadMore = () => {
        setQuery({ ...query, page: query.page + 1 })
    }
    return (
        <div>
            <div className={'mv-container'}>
                {mvList.map(item => (
                    <MvCard width={'240px'} key={item.id} src={item.imgurl} title={item.name} />
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

export default SingerDetailMvList
