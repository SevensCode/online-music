import React, { FC, useCallback, useMemo } from 'react';
import { Tooltip } from 'antd';
import './index.less';
import { useRecoilValue } from 'recoil';
import { audio_musicDetails, auido_status } from '@/recoil/audio';
import { useAudioPause, useAudioPlay } from '@/hooks/audio';

interface Props {
    size?: 'small' | 'large';
    color?: string | undefined;
}

const AudioController: FC<Props> = ({ size = 'small', color }) => {
    const musicDetails = useRecoilValue(audio_musicDetails);
    const audioStatus = useRecoilValue(auido_status);
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
        console.log(audioStatus);
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
                <i
                    className={['iconfont icon-shangyishou prve', size].join(
                        ' ',
                    )}
                    style={{ color }}
                />
            </Tooltip>
            <Tooltip placement="top" title={status.name}>
                <i
                    onClick={playOrPause}
                    style={{ color }}
                    className={[
                        'iconfont playing playing',
                        size,
                        status.icon,
                    ].join(' ')}
                />
            </Tooltip>
            <Tooltip placement="top" title="下一首">
                <i
                    className={['iconfont icon-xiayishou next', size].join(' ')}
                    style={{ color }}
                />
            </Tooltip>
        </div>
    );
};

export default AudioController;
