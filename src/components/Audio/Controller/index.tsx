import React, { FC, useCallback, useMemo } from 'react';
import { Tooltip } from 'antd';
import './index.less';
import { useRecoilValue } from 'recoil';
import { atom_audio_musicDetails, atom_auido_status } from '@/recoil/audio';
import { useAudioPause, useAudioPlay } from '@/hooks/audio';

const Controller: FC = () => {
    const musicDetails = useRecoilValue(atom_audio_musicDetails);
    const audioStatus = useRecoilValue(atom_auido_status);
    const audioPause = useAudioPause();
    const audioPlay = useAudioPlay();
    const status = useMemo(
        () => ({
            name: audioStatus === 2 ? '暂停' : '播放',
            icon: audioStatus === 2 ? 'icon-zanting2' : 'icon-bofang1',
        }),
        [audioStatus],
    );
    const playOrPause = useCallback(() => {
        audioStatus === 2 ? audioPause() : audioPlay();
    }, [audioStatus]);
    return (
        <div
            className={[
                'controller',
                musicDetails === null ? 'disable' : undefined,
            ].join(' ')}
        >
            <Tooltip placement="top" title="上一首">
                <i className="iconfont icon-shangyishou prve" />
            </Tooltip>
            <Tooltip placement="top" title={status.name}>
                <i
                    onClick={playOrPause}
                    className={['iconfont playing', status.icon].join(' ')}
                />
            </Tooltip>
            <Tooltip placement="top" title="下一首">
                <i className="iconfont icon-xiayishou next" />
            </Tooltip>
        </div>
    );
};

export default Controller;
