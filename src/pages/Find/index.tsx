import React, { FC, useCallback, useEffect, useState } from 'react';
import './index.less';
import Banner from '@/pages/Find/components/Banner';
import BannerItem from '@/pages/Find/components/Banner/item';
import { OtherRequst } from '@/api/other';

const Find: FC = (props) => {
    const [banner, setBanner] = useState<any[]>([]);
    const getBanner = useCallback(async () => {
        const { banners } = await OtherRequst.getBanner();
        setBanner(banners || []);
    }, []);
    useEffect(() => {
        getBanner();
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

export default Find;
