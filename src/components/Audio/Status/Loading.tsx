import React, { FC } from 'react';
import './index.less';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
    className?: string;
    onClick?: () => void;
}

const AudioStatusLoading: FC<Props> = ({ className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={['audioStatus', 'loading', className].join(' ')}
        >
            <LoadingOutlined />
        </div>
    );
};

export default AudioStatusLoading;
