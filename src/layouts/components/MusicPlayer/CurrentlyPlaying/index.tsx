import React, { FC, useCallback } from 'react';
import './index.less';
import { useRecoilState, useRecoilValue } from 'recoil';
import { music_detail, music_songList } from '@/recoil/muisc';
import AuthorTags from '@/components/AuthorTags';
import { millisecondTurnTime } from '@/utils';
import PlayOrPauseIcon from '@/components/Icon/PlayOrPause';

const CurrentlyPlaying: FC = () => {
    const [songList, setSongList] = useRecoilState(music_songList);
    const musicDetail = useRecoilValue(music_detail);
    const pause = useCallback(
        (id) => {
            if (musicDetail === null) return true;
            return musicDetail.id === id;
        },
        [musicDetail],
    );
    const onPlay = useCallback(() => {}, []);
    const onPause = useCallback(() => {}, []);
    return (
        <div className={'currentlyPlaying'}>
            <h3 className={'module-title'}>当前播放</h3>
            <div className="currentlyPlaying-other">
                <p className="currentlyPlaying-total">
                    总{songList?.list.length}首
                </p>
                <p className="currentlyPlaying-clearTheList">
                    <i className={'iconfont icon-top'}></i>
                    清空列表
                </p>
            </div>
            <ul className="currentlyPlaying-ul">
                {songList !== null &&
                    songList.list.map(({ name, authors, duration, id }) => {
                        const { minute, second } =
                            millisecondTurnTime(duration);
                        return (
                            <li className="currentlyPlaying-li" key={id}>
                                <PlayOrPauseIcon
                                    onPlay={onPlay}
                                    onPause={onPause}
                                    pause={pause(id)}
                                    className={'currentlyPlaying-type'}
                                />
                                <p className="currentlyPlaying-name text-1LinesHide">
                                    {name}
                                </p>
                                <p className="currentlyPlaying-author text-1LinesHide">
                                    <AuthorTags authors={authors} />
                                </p>
                                <p className="currentlyPlaying-duration">
                                    {minute}:{second}
                                </p>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default CurrentlyPlaying;
