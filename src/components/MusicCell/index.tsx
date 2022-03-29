import React, { FC } from 'react';
import ImageLazy from '@/components/ImageLazy';
import './index.less';
import AuthorTags from '@/components/AuthorTags';
import Like from '@/components/Like';
import AudioStatus from '@/components/Audio/Status';

interface Props {
    coverPicture: string;
    name: string;
    id: number;
    authors: { name: string; id: number }[];
    album: { name: string; id: number };

    onPlay?(): void;

    onPaused?(): void;
}

const MusicCell: FC<Props> = ({
    coverPicture,
    name,
    id,
    authors,
    album,
    onPlay,
    onPaused,
}) => {
    return (
        <div className={'musicCell'}>
            <div className="musicCell-coverPicture-container">
                <ImageLazy
                    src={coverPicture}
                    className="musicCell-coverPicture"
                />
                <AudioStatus
                    className={'musicCell-audioStatus'}
                    id={id}
                    onPlay={onPlay}
                    onPaused={onPaused}
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
