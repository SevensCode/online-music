import React, { FC } from 'react';
import './index.less';

interface Props {
    className?: string;
    onClick?: () => void;
}

const Play: FC<Props> = ({ className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={['audioStatus', 'play', className].join(' ')}
        >
            <i className="iconfont icon-bofang1" />
        </div>
    );
};

export default Play;
