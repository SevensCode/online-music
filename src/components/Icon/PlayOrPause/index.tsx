import React, { FC } from 'react';

interface Props {
    pause?: boolean;
    className?: string;

    onPlay?(): void;

    onPause?(): void;
}

const PlayOrPauseIcon: FC<Props> = ({
    pause = false,
    onPlay,
    onPause,
    className,
}) => {
    const icon = pause ? 'icon-zanting2' : 'icon-bofang1';
    const onClick = () => {
        if (onPause) !pause && onPause();
        if (onPlay) pause && onPlay();
    };
    return (
        <i
            onClick={onClick}
            className={['iconfont', icon, className].join(' ')}
        ></i>
    );
};

export default PlayOrPauseIcon;
