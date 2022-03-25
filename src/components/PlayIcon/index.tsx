import React, { FC } from 'react';
import './index.less';

const PlayIcon: FC<{ className: string }> = ({ className }) => {
    return (
        <div className={['playIcon', className].join(' ')}>
            <i className="iconfont icon-bofang1" />
        </div>
    );
};

export default PlayIcon;
