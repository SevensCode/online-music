import React, { FC, useCallback } from 'react';
import { Slider } from 'antd';

const AudioProgressBar: FC<{ className?: string }> = ({ className }) => {
    const onChange = useCallback(() => {}, []);
    const onAfterChange = useCallback(() => {}, []);
    const tipFormatter = useCallback(() => {
        return '';
    }, []);
    return (
        <Slider
            onChange={onChange}
            onAfterChange={onAfterChange}
            className={[className, 'progressBar'].join(' ')}
            step={1}
            tipFormatter={tipFormatter}
            min={0}
            defaultValue={0}
        />
    );
};

export default AudioProgressBar;
