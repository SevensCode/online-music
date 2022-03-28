import React, { FC } from 'react';
import { Tooltip } from 'antd';
import './index.less';

const Controller: FC = () => {
    return (
        <div className={'controller'}>
            <Tooltip placement="top" title="上一首">
                <i className="iconfont icon-shangyishou prve" />
            </Tooltip>
            <Tooltip placement="top" title={'播放'}>
                <i className={['iconfont playing', 'icon-bofang1'].join(' ')} />
            </Tooltip>
            <Tooltip placement="top" title="下一首">
                <i className="iconfont icon-xiayishou next" />
            </Tooltip>
        </div>
    );
};

export default Controller;
