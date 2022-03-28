import React from 'react';
import { Slider, Tooltip } from 'antd';
import './index.less';

const AudioVolume = () => {
    return (
        <div className={'audioVolume'}>
            <Tooltip placement="top" title="音量">
                <i className="volume iconfont icon-yinliang" />
            </Tooltip>
            <Slider defaultValue={30} className="volume-progressBar" />
        </div>
    );
};

export default AudioVolume;
