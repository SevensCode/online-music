import React, { FC } from 'react';
import './index.less';

interface Props {
    className?: string;
    onClick?: () => void;
}

const PlayIcon: FC<Props> = ({ onClick, className }) => {
    return (
        <div onClick={onClick} className={['playIcon', className].join(' ')}>
            <i className="iconfont icon-bofang1" />
        </div>
    );
};

export default PlayIcon;
