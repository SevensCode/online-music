// 获取推荐歌单
import { SongListRequst } from '@/api/songList';
import React, { useEffect, useState } from 'react';
import GraphicsCard from '@/components/SongListCard';
import { numberUnit } from '@/utils';

const getRecommendedPlaylist = async () => {
    const { result } = await SongListRequst.getRecommendedPlaylist();
    return result || [];
};
const RecommendedPlaylist = () => {
    // 推荐歌单列表
    const [songList, setSongList] = useState<any[]>([]);
    useEffect(() => {
        getRecommendedPlaylist().then((value) => setSongList(value));
    }, []);
    return (
        <div className="find-recommendedPlaylist-container">
            {songList.map(({ id, name, picUrl, playCount }) => (
                <GraphicsCard
                    key={id}
                    title={name}
                    src={picUrl + '?param=250y250'}
                    width={'190px'}
                    volume={numberUnit(playCount)}
                />
            ))}
        </div>
    );
};

export default RecommendedPlaylist;
