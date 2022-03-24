import React, { FC, useEffect, useState } from 'react';
import './index.less';
import Banner from '@/pages/Find/components/Banner';
import BannerItem from '@/pages/Find/components/Banner/item';
import { OtherRequst } from '@/api/other';
import { KeepAlive } from 'umi';

// 获取轮播图
const getBanner = async () => {
    const { banners } = await OtherRequst.getBanner();
    return banners || [];
};

const Find: FC = (props) => {
    const [banner, setBanner] = useState<any[]>([]);

    useEffect(() => {
        getBanner().then((value) => setBanner(value));
    }, []);
    return (
        <div className="find app-container">
            <Banner>
                {banner.map((item: any, i) => (
                    <BannerItem key={i}>
                        <img
                            className="find-banner-img"
                            src={item.imageUrl}
                            alt=""
                        />
                    </BannerItem>
                ))}
            </Banner>
        </div>
    );
};

export default () => {
    return (
        <KeepAlive saveScrollPosition="screen" name={'find'} when={true}>
            <Find />
        </KeepAlive>
    );
};
