import React, { FC, MouseEvent } from 'react'
import './index.less'
import ImageLazy from '@/components/ImageLazy'
import PlayIcon from '@/components/Icon/Play'

interface Props {
    width?: string
    title: string
    src: string
    // 播放量
    count: string | number
    userName?: string

    onClickUser?(): void

    onClick?(): void
}

// 歌单卡片
const SongListCard: FC<Props> = ({
    width = '200px',
    src,
    title,
    count,
    onClick,
    onClickUser,
    userName
}) => {
    const suerClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        onClickUser && onClickUser()
    }
    return (
        <div className={'songListCard'} style={{ width }}>
            <section className={'songListCard-img-container'}>
                <p className={'songListCard-playVolume'}>
                    <i className='iconfont icon-24gl-play' />
                    {count}
                </p>
                <PlayIcon className={'songListCard-playIcon'} />
                <ImageLazy src={src} className={'songListCard-img'} />
                {userName && (
                    <div onClick={suerClick} className='songListCard-user'>
                        <i className={'iconfont icon-user'}></i>
                        {userName}
                    </div>
                )}
            </section>
            <p
                onClick={onClick}
                className={'songListCard-title text-2LinesHide'}
            >
                {title}
            </p>
        </div>
    )
}

export default SongListCard
