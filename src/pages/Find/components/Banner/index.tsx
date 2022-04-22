import React, { useEffect, useState } from 'react'
import { OtherRequst } from '@/server/api/other'
import Banner from '@/components/Banner'
import BannerItem from '@/components/Banner/item'
// 获取轮播图
const getBanner = async () => {
    const { banners } = await OtherRequst.getBanner()
    return banners || []
}
const FindBanner = () => {
    // 轮播图列表
    const [banner, setBanner] = useState<any[]>([])
    useEffect(() => {
        getBanner().then((value) => setBanner(value))
    }, [])
    return (
        <Banner>
            {banner.map(({ imageUrl }, i) => (
                <BannerItem key={i}>
                    <img className='find-banner-img' src={imageUrl} alt='' />
                </BannerItem>
            ))}
        </Banner>
    )
}

export default FindBanner
