import React, { FC } from 'react';
import './index.less';
import ImageLazy from '@/components/ImageLazy';
import AudioStatusPlay from '@/components/Audio/Status/Play';

interface Props {
    width?: string;
    title: string;
    src: string;
    // 播放量
    volume: string | number;
}

// 歌单卡片
const SongListCard: FC<Props> = ({ width = '250px', src, title, volume }) => {
    return (
        <div className={'songListCard'} style={{ width }}>
            <section className={'songListCard-img-container'}>
                <p className={'songListCard-playVolume'}>
                    <i className="iconfont icon-24gl-play" />
                    {volume}
                </p>
                <AudioStatusPlay className={'songListCard-playIcon'} />
                <ImageLazy src={src} className={'songListCard-img'} />
            </section>
            <p className={'songListCard-title text-2LinesHide'}>{title}</p>
        </div>
    );
};

export default SongListCard;
