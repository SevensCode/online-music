import React, { FC } from 'react'

interface Props {
    type?: 'play' | 'pause'
    className?: string

    onPlay?(): void

    onPause?(): void
}

const PlayOrPauseIcon: FC<Props> = ({
    type = 'play',
    onPlay,
    onPause,
    className
}) => {
    const icon = type ? 'icon-bofang1' : 'icon-zanting2'
    const onClick = () => {
        if (onPause && type === 'pause') onPause()
        if (onPlay && type === 'play') onPlay()
    }
    return (
        <i
            onClick={onClick}
            className={['iconfont', icon, className].join(' ')}
        ></i>
    )
}

export default PlayOrPauseIcon
