import React, { FC } from 'react';
import ImageLazy from '@/components/ImageLazy';
import './index.less';
import AuthorTags from '@/components/AuthorTags';
import Like from '@/components/Like';
import PlayIcon from '@/components/Icon/Play';

interface Props {
    coverPicture: string;
    name: string;
    id: number;
    authors: { name: string; id: number }[];
    album: { name: string; id: number };
    isActive?: boolean;

    onPlay?(): void;
}

const MusicCell: FC<Props> = ({
    coverPicture,
    name,
    id,
    authors,
    album,
    onPlay,
    isActive,
}) => (
    <div className={['musicCell', isActive ? 'active' : ''].join(' ')}>
        <div className="musicCell-coverPicture-container">
            <ImageLazy src={coverPicture} className="musicCell-coverPicture" />
            <PlayIcon onClick={onPlay} className={'musicCell-audioStatus'} />
        </div>
        <div className={'musicCell-content'}>
            <p className="musicCell-name text-1LinesHide">{name}</p>
            <p className="musicCell-album text-1LinesHide">《{album.name}》</p>
            <p className="musicCell-author text-1LinesHide">
                <AuthorTags authors={authors} />
            </p>
        </div>
        <Like id={id} size={'20px'} />
    </div>
);

export default MusicCell;
