import React, { FC } from 'react'
import ImageLazy from '@/components/ImageLazy'
import './index.less'

interface Props {
    src: string
    name: string
    width?: string

    onClick?(): void
}

const SingerCard: FC<Props> = ({ src, name, width = '150px', onClick }) => {
    return (
        <div onClick={onClick} className={'singerCard'} style={{ width }}>
            <div className='singerCard-avatar-box'>
                <ImageLazy src={src + '?param=250y250'} className={'singerCard-avatar'}></ImageLazy>
            </div>
            <p className='singerCard-name'>{name}</p>
        </div>
    )
}

export default SingerCard
