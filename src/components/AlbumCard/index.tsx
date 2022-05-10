import React, { FC } from 'react'
import ImageLazy from '@/components/ImageLazy'
import './index.less'

interface Props {
    src: string
    title: string
    type: string
    width?: string

    onClick?(): void
}

const AlbumCard: FC<Props> = ({ src, title, onClick, type, width = '200px' }) => {
    return (
        <div className={'albumCard'} style={{ width }}>
            <section className={'albumCard-img-container'} onClick={onClick}>
                <p className={'albumCard-type'}>{type}</p>
                <ImageLazy src={src + '?param=250y250'} className={'albumCard-img'} />
            </section>
            <p onClick={onClick} className={'albumCard-title text-2LinesHide'}>
                {title}
            </p>
        </div>
    )
}
export default AlbumCard
