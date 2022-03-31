import React, { FC } from 'react';
import './index.less';

interface Props {
    className?: string;
    onClick?: () => void;
}

const AudioStatusPlay: FC<Props> = ({ className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={['audioStatus', 'play', className].join(' ')}
        >
            <i className="iconfont icon-bofang1" />
        </div>
    );
};

export default AudioStatusPlay;
