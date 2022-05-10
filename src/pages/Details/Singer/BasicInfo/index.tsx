import React, { useEffect, useRef, useState } from 'react'
import { SingerDetail } from '@/types/singer'
import { SingerRequst } from '@/server/api/singer'
import { formatSingerDetail } from '@/utils/detailFormatting'
import { computeLineCount } from '@/utils/tool'
import { Modal } from 'antd'
import { useLocation } from 'umi'

const getSingerDetail = async (id: number) => {
    const { data } = await SingerRequst.getDetail(id)
    return formatSingerDetail(data || {})
}
const SingerBasicInfo = () => {
    const [detail, setDetail] = useState<Nullable<SingerDetail>>(null)
    const [lineCount, setLineCount] = useState(0)
    const introductionRef = useRef<HTMLParagraphElement>(null)
    const location: any = useLocation()
    useEffect(() => {
        getSingerDetail(location.query.id).then(value => setDetail(value))
    }, [location])
    useEffect(() => {
        if (introductionRef.current === null) return
        // 计算行数
        setLineCount(computeLineCount(introductionRef.current))
    }, [detail])
    const viewIntroduction = () => {
        if (lineCount < 4) return
        Modal.info({
            content: detail?.introduction,
            title: '介绍',
            width: '50%'
        })
    }
    return (
        <div className='singerDetailPage-basicInfo'>
            <img className={'singerDetailPage-basicInfo-avatar'} src={detail?.avatar + '?param=250y250'} alt='' />
            <p className='singerDetailPage-basicInfo-name'>{detail?.name}</p>
            <p className='singerDetailPage-basicInfo-description text-3LinesHide' onClick={viewIntroduction}>
                {detail?.introduction}
            </p>
            <p className={'singerDetailPage-basicInfo-description contentHidden'} ref={introductionRef}>
                {detail?.introduction}
            </p>
            <div className='singerDetailPage-basicInfo-count'>
                <div>
                    <p>{detail?.musicSize}</p>
                    <p>单曲数</p>
                </div>
                <div>
                    <p>{detail?.albumSize}</p>
                    <p>专辑数</p>
                </div>
                <div>
                    <p>{detail?.mvSize}</p>
                    <p>Mv数</p>
                </div>
            </div>
        </div>
    )
}

export default SingerBasicInfo
