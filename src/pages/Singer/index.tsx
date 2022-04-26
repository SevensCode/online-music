import React, { FC, useEffect, useState } from 'react'
import { KeepAlive } from '@@/core/umiExports'
import './index.less'
import { Singer_GetListOfSingersByCategory_Params } from '@/server/api/singer/params'
import { SingerRequst } from '@/server/api/singer'
import SingerCard from '@/components/SingerCard'
import { formatSingerDetail } from '@/utils/objectFormatting'
import { SingerDetail } from '@/types/Singer'
import { CaretDownOutlined } from '@ant-design/icons'
import CustomButton from '@/components/CustomButton'
// 语种
const language = [
    { name: '全部', id: -1 },
    { name: '华语', id: 7 },
    { name: '欧美', id: 96 },
    { name: '日本', id: 8 },
    { name: '韩国', id: 16 },
    { name: '其他', id: 0 }
]
// 分类
const category = [
    { name: '全部', id: -1 },
    { name: '男歌手', id: 1 },
    { name: '女歌手', id: 2 },
    { name: '乐队', id: 3 }
]
// 筛选
const filter = ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
const getListOfSingersByCategory = async (query: Singer_GetListOfSingersByCategory_Params): Promise<{ more: boolean; singer: SingerDetail[] }> => {
    const { artists, more } = await SingerRequst.getListOfSingersByCategory(query)
    const singers = artists || []
    return {
        more,
        singer: singers.map((item: any) => formatSingerDetail(item))
    }
}
const Singer: FC = () => {
    const [query, setQuery] = useState<Singer_GetListOfSingersByCategory_Params>({
        area: -1,
        initial: '热门',
        limit: 42,
        page: 1,
        type: -1
    })
    const [singerList, setSingerList] = useState<SingerDetail[]>([])
    const [isLoading, setLoadng] = useState(false)
    const [more, setMore] = useState(false)
    useEffect(() => {
        let initial: string | number = query.initial
        if (query.initial === '热门') {
            initial = -1
        } else if (query.initial === '#') {
            initial = 0
        }
        getListOfSingersByCategory({ ...query, initial }).then(({ more, singer }) => {
            setSingerList(query.page !== 1 ? [...singerList, ...singer] : singer)
            setMore(more)
            setLoadng(false)
        })
    }, [query])
    const onClickTag = (key: string, value: string | number) => {
        setQuery({ ...query, page: 1, [key]: value })
    }
    const loadMore = () => {
        setQuery({ ...query, page: query.page + 1 })
        setLoadng(true)
    }
    return (
        <div className={'singer app-container'}>
            <div className='singer-category'>
                <div className='singer-category-item'>
                    {language.map(({ id, name }) => (
                        <span onClick={() => onClickTag('area', id)} className={id === query.area ? 'active' : ''} key={id}>
                            {name}
                        </span>
                    ))}
                </div>
                <div className='singer-category-item'>
                    {category.map(({ id, name }) => (
                        <span onClick={() => onClickTag('type', id)} className={id === query.type ? 'active' : ''} key={id}>
                            {name}
                        </span>
                    ))}
                </div>
                <div className='singer-category-item'>
                    {filter.map(name => (
                        <span onClick={() => onClickTag('initial', name)} className={name === query.initial ? 'active' : ''} key={name}>
                            {name}
                        </span>
                    ))}
                </div>
            </div>
            <div className='singer-list'>
                {singerList.map((singer, i) => (
                    <SingerCard key={i} width={'190px'} src={singer.avatar + '?param=250y250'} name={singer.name}></SingerCard>
                ))}
            </div>
            {singerList.length && more && (
                <div className='center-container'>
                    <CustomButton loading={isLoading} type={'primary'} size={'small'} className={'default'} onClick={loadMore}>
                        加载更多 <CaretDownOutlined />
                    </CustomButton>
                </div>
            )}
        </div>
    )
}

export default () => (
    // @ts-ignore
    <KeepAlive name={'singer'} when={true}>
        <Singer />
    </KeepAlive>
)
