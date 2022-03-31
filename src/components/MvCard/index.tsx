import React, { FC } from 'react';
import './index.less';
import ImageLazy from '@/components/ImageLazy';
import AudioStatusPlay from '@/components/Audio/Status/Play';

interface Props {
    width?: string;
    title: string;
    src: string;
}

// 歌单卡片
const MvCard: FC<Props> = ({ width = '400px', src, title }) => {
    return (
        <div className={'mvCard'} style={{ width }}>
            <section className={'mvCard-img-container'}>
                <AudioStatusPlay className={'mvCard-playIcon'} />
                <ImageLazy src={src} className={'mvCard-img'} />
            </section>
            <p className={'mvCard-title text-2LinesHide'}>{title}</p>
        </div>
    );
};

export default MvCard;
