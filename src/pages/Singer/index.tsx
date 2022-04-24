import React, { FC, useEffect, useState } from 'react'
import { KeepAlive } from '@@/core/umiExports'
import './index.less'
import { Singer_GetListOfSingersByCategory_Params } from '@/server/api/singer/params'
import { SingerRequst } from '@/server/api/singer'
import SingerCard from '@/components/SingerCard'
// 语种
const language = [
    { name: '全部', id: -1 },
    { name: '华语', id: 7 },
    { name: '欧美', id: 96 },
    {
        name: '日本',
        id: 8
    },
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
const filter = [
    '热门',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '#'
]
const getListOfSingersByCategory = async (
    query: Singer_GetListOfSingersByCategory_Params
) => {
    const { artists } = await SingerRequst.getListOfSingersByCategory(query)
    return artists || []
}
const Singer: FC = () => {
    const [query, setQuery] =
        useState<Singer_GetListOfSingersByCategory_Params>({
            area: -1,
            initial: '热门',
            limit: 42,
            page: 1,
            type: -1
        })
    const [singerList, setSingerList] = useState()
    useEffect(() => {
        getListOfSingersByCategory(query).then((r) => {
            setSingerList(r)
        })
    }, [])
    return (
        <div className={'singer app-container'}>
            <div className='singer-category'>
                <div className='singer-category-item'>
                    {language.map(({ id, name }) => (
                        <span
                            className={id === query.area ? 'active' : ''}
                            key={id}
                        >
                            {name}
                        </span>
                    ))}
                </div>
                <div className='singer-category-item'>
                    {category.map(({ id, name }) => (
                        <span
                            className={id === query.type ? 'active' : ''}
                            key={id}
                        >
                            {name}
                        </span>
                    ))}
                </div>
                <div className='singer-category-item'>
                    {filter.map((name) => (
                        <span
                            className={name === query.initial ? 'active' : ''}
                            key={name}
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
            <div className='singer-list'>
                {singerList}
                <SingerCard src={} name={}></SingerCard>
            </div>
        </div>
    )
}

export default () => (
    // @ts-ignore
    <KeepAlive name={'singer'} when={true}>
        <Singer />
    </KeepAlive>
)
