import React, { FC } from 'react';
import { BannerStatus } from '@/pages/Find/components/Banner/index';

interface Props {
    status?: BannerStatus;
}

const BannerItem: FC<Props> = ({ children, status }) => {
    return (
        <div className={['banner-list-item', status].join(' ')}>{children}</div>
    );
};

export default BannerItem;
