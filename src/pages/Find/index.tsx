import React, { FC } from 'react';
import { history } from 'umi';
import './index.less';
import Banner from '@/pages/Find/components/Banner';
import BannerItem from '@/pages/Find/components/Banner/item';

const Find: FC = (props) => {
    const test = () => {
        history.push({
            pathname: '/login',
            query: {
                redirect: '/find',
            },
        });
    };
    return (
        <div>
            <Banner>
                <BannerItem>test1</BannerItem>
                <BannerItem>test2</BannerItem>
            </Banner>
        </div>
    );
};

export default Find;
