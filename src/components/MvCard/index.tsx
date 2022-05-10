import React, { FC } from 'react'
import './index.less'
import ImageLazy from '@/components/ImageLazy'
import PlayIcon from '@/components/Icon/Play'

interface Props {
    width?: string
    title: string
    src: string
}

// 歌单卡片
const MvCard: FC<Props> = ({ width = '400px', src, title }) => {
    return (
        <div className={'mvCard'} style={{ width }}>
            <section className={'mvCard-img-container'}>
                <PlayIcon className={'mvCard-playIcon'} />
                <ImageLazy src={src + '?param=300y168'} className={'mvCard-img'} />
            </section>
            <p className={'mvCard-title text-2LinesHide'}>{title}</p>
        </div>
    )
}

export default MvCard
