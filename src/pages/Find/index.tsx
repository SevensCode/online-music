import React, { FC, useEffect, useState } from 'react';
import './index.less';
import Banner from '@/pages/Find/components/Banner';
import BannerItem from '@/pages/Find/components/Banner/item';
import { OtherRequst } from '@/api/other';
import { KeepAlive } from 'umi';
import { SongListRequst } from '@/api/songList';
import GraphicsCard from '@/components/SongListCard';
import { numberUnit } from '@/utils';
import { MvRequst } from '@/api/mv';
import MvCard from '@/components/MvCard';
import { MusicRequest } from '@/api/music';
import MusicCell from '@/components/MusicCell';

// 获取轮播图
const getBanner = async () => {
    const { banners } = await OtherRequst.getBanner();
    return banners || [];
};
// 获取推荐歌单
const getRecommendedPlaylist = async () => {
    const { result } = await SongListRequst.getRecommendedPlaylist();
    return result || [];
};

// 获取独家放送
const getExclusiveBroadcast = async () => {
    const { result } = await MvRequst.exclusiveBroadcast();
    return result || [];
};

// 获取新音乐
const getNewMusic = async () => {
    const { result } = await MusicRequest.newMusicPush();
    return result || [];
};
const Find: FC = () => {
    // 轮播图列表
    const [banner, setBanner] = useState<any[]>([]);
    // 推荐歌单列表
    const [songList, setSongList] = useState<any[]>([]);
    // 独家放送列表
    const [exclusiveBroadcastList, setExclusiveBroadcast] = useState<any[]>([]);
    const [newMusicList, setNewMusicList] = useState<any[]>([]);
    useEffect(() => {
        getBanner().then((value) => setBanner(value));
        getRecommendedPlaylist().then((value) => setSongList(value));
        getExclusiveBroadcast().then((value) => setExclusiveBroadcast(value));
        getNewMusic().then((value) => setNewMusicList(value));
    }, []);
    return (
        <div className="find app-container">
            {/*轮播图*/}
            <Banner>
                {banner.map(({ imageUrl }, i) => (
                    <BannerItem key={i}>
                        <img
                            className="find-banner-img"
                            src={imageUrl}
                            alt=""
                        />
                    </BannerItem>
                ))}
            </Banner>
            {/*推荐歌单*/}
            <h3 className={'module-title'}>推荐歌单</h3>
            <div className="find-recommendedPlaylist-container">
                {songList.map(({ id, name, picUrl, playCount }) => (
                    <GraphicsCard
                        key={id}
                        title={name}
                        src={picUrl + '?param=250y250'}
                        width={'230px'}
                        volume={numberUnit(playCount)}
                    />
                ))}
            </div>
            <h3 className={'module-title'}>独家放送</h3>
            <div className={'find-exclusiveBroadcast-container'}>
                {exclusiveBroadcastList.map(({ id, name, sPicUrl }) => (
                    <MvCard title={name} key={id} src={sPicUrl} />
                ))}
            </div>
            <h3 className={'module-title'}>新音乐推送</h3>
            <div className={'find-newMusicPush-container'}>
                {newMusicList.map(
                    ({ id, name, picUrl, song: { album, artists } }) => (
                        <MusicCell
                            name={name}
                            id={id}
                            authors={artists}
                            coverPicture={picUrl + '?param=250y250'}
                            key={id}
                            album={{
                                name: album.name,
                                id: album.id,
                            }}
                        />
                    ),
                )}
            </div>
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
