import React, { FC } from 'react';
import './index.less';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
    content?: string;
    className?: string;
}

const Loading: FC<Props> = ({
    content = '请稍等，正在加载中！',
    className,
}) => {
    return (
        <p className={['loging', className].join(' ')}>
            <LoadingOutlined style={{ fontSize: '30px' }} spin />{' '}
            <span>{content}</span>
        </p>
    );
};

export default Loading;
