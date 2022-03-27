import React, { FC } from 'react';
import './index.less';

interface Props {
    className: string;
    // 音乐id
    id: number;
}

const MusicStatus: FC<Props> = ({ className }) => {
    return (
        <div className={['musicStatus', className].join(' ')}>
            <i className={'iconfont icon-bofang1'}></i>
            <i className={'iconfont icon-zanting2'}></i>
        </div>
    );
};

export default MusicStatus;
