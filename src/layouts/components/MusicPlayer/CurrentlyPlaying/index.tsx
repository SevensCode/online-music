import React, { FC } from 'react';
import './index.less';
import { useRecoilState } from 'recoil';
import { music_songList } from '@/recoil/muisc';
import AuthorTags from '@/components/AuthorTags';
import { millisecondTurnTime } from '@/utils';

const CurrentlyPlaying: FC = () => {
    const [songList, setSongList] = useRecoilState(music_songList);
    console.log(songList);
    return (
        <div className={'currentlyPlaying'}>
            <h3 className={'module-title'}>当前播放</h3>
            <div className="currentlyPlaying-other">
                <span className="currentlyPlaying-total">总561651首</span>
                <span className="currentlyPlaying-clearTheList">
                    <i className={'iconfont icon-top'}></i>
                    清空列表
                </span>
            </div>
            <ul className="currentlyPlaying-ul">
                {songList !== null &&
                    songList.list.map(({ name, authors, duration, id }) => {
                        const { minute, second } =
                            millisecondTurnTime(duration);
                        return (
                            <li className="currentlyPlaying-li" key={id}>
                                <span className="currentlyPlaying-type">
                                    <i className="iconfont icon-bofang1" />
                                </span>
                                <span className="currentlyPlaying-name text-1LinesHide">
                                    {name}
                                </span>
                                <span className="currentlyPlaying-author text-1LinesHide">
                                    <AuthorTags authors={authors} />
                                </span>
                                <span className="currentlyPlaying-duration">
                                    {minute}:{second}
                                </span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default CurrentlyPlaying;
