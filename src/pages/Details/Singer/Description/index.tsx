import React, { FC, useEffect, useState } from 'react'
import { SingerRequst } from '@/server/api/singer'
import { history } from 'umi'
import './index.less'

const SingerDetailDescription: FC = () => {
    const [desc, setDesc] = useState<{ introduction: any[]; briefDesc: string }>({ briefDesc: '', introduction: [] })
    useEffect(() => {
        SingerRequst.getDescription(Number(history.location.query?.id)).then(description => {
            console.log(description)
            setDesc(description)
        })
    }, [history.location.query])
    return (
        <div className={'singerDetailDescription'}>
            <h3 className={'module-title'}>简介</h3>
            <p className={'singerDetailDescription-content'}>{desc.briefDesc}</p>
            {desc.introduction.map((item, i) => (
                <div key={i}>
                    <h3 className={'module-title'}>{item.ti}</h3>
                    <p className={'singerDetailDescription-content'}>{item.txt}</p>
                </div>
            ))}
        </div>
    )
}

export default SingerDetailDescription
