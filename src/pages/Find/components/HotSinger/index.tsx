import React, { useEffect, useState } from 'react';
import { SingerRequst } from '@/api/singer';
import SingerCard from '@/components/SingerCard';
// 获取热门歌手
const getHotSingers = async () => {
    const { artists } = await SingerRequst.hotSingers({ limit: 30, page: 1 });
    return artists || [];
};
const HotSinger = () => {
    // 热门歌手
    const [hotSingerList, setHotSingers] = useState<any[]>([]);
    useEffect(() => {
        getHotSingers().then((value) => setHotSingers(value));
    }, []);
    return (
        <div className={'find-hotSingers-container'}>
            {hotSingerList.map(({ id, name, picUrl }) => (
                <SingerCard
                    name={name}
                    src={picUrl + '?param=250y250'}
                    width={'190px'}
                    key={id}
                />
            ))}
        </div>
    );
};

export default HotSinger;
