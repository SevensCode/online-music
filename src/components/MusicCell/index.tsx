import React, { FC } from 'react';
import ImageLazy from '@/components/ImageLazy';
import './index.less';
import AuthorTags from '@/components/AuthorTags';
import Like from '@/components/Like';

interface Props {
    // 音乐id
    id: number;
    // 音乐名称
    name: string;
    // 音乐封面图
    coverPicture: string;
    // 作者
    authors: { name: string; id: number | string }[];
    // 专辑
    album: {
        name: string;
        id: number | string;
    };
}

const MusicCell: FC<Props> = ({ coverPicture, name, id, authors, album }) => {
    return (
        <div className={'musicCell'}>
            <div className="musicCell-coverPicture-container">
                <ImageLazy
                    src={coverPicture}
                    className="musicCell-coverPicture"
                />
            </div>
            <div className={'musicCell-content'}>
                <p className="musicCell-name text-1LinesHide">{name}</p>
                <p className="musicCell-album text-1LinesHide">
                    《{album.name}》
                </p>
                <p className="musicCell-author text-1LinesHide">
                    <AuthorTags authors={authors} />
                </p>
            </div>
            <Like id={id} size={'16px'} />
        </div>
    );
};

export default MusicCell;
