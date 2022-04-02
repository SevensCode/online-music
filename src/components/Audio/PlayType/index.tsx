import React, { FC, useCallback } from 'react';
import { AUDIO_PLAY_TYPE } from '@/constants';
import { Tooltip } from 'antd';
import { useRecoilState } from 'recoil';
import { audio_playType } from '@/recoil/audio';
import './index.less';

const AudioPlayType: FC<{ className?: string }> = ({ className }) => {
    const [playType, setPlayType] = useRecoilState(audio_playType);
    const handlePlayTyoe = useCallback(() => {
        playType !== AUDIO_PLAY_TYPE.length - 1
            ? setPlayType(playType + 1)
            : setPlayType(0);
    }, [playType]);
    return (
        <Tooltip placement="top" title={AUDIO_PLAY_TYPE[playType].name}>
            <i
                onClick={handlePlayTyoe}
                className={[
                    'audio-playType',
                    'iconfont',
                    AUDIO_PLAY_TYPE[playType].icon,
                    className,
                ].join(' ')}
            />
        </Tooltip>
    );
};

export default AudioPlayType;
