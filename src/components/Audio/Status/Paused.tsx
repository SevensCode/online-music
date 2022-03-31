import React, { FC } from 'react';
import './index.less';

interface Props {
    className?: string;
}

const AudioStatusPaused: FC<Props> = ({ className }) => {
    return (
        <div className={['audioStatus', 'paused', className].join(' ')}>
            <i className="iconfont icon-zanting2" />
        </div>
    );
};

export default AudioStatusPaused;
