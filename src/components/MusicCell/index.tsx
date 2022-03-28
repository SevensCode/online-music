import React, { FC, MouseEvent } from 'react';
import ImageLazy from '@/components/ImageLazy';
import './index.less';
import AuthorTags from '@/components/AuthorTags';
import Like from '@/components/Like';
import { MusicDetails } from '@/recoil/types/audio';

interface Props extends MusicDetails {
    onClick?(event: MouseEvent<HTMLImageElement>): void;
}

const MusicCell: FC<Props> = ({
    coverPicture,
    name,
    id,
    authors,
    album,
    onClick,
}) => {
    return (
        <div className={'musicCell'}>
            <div className="musicCell-coverPicture-container">
                <ImageLazy
                    src={coverPicture}
                    className="musicCell-coverPicture"
                    onClick={onClick}
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
