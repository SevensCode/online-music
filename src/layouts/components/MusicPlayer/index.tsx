import React from 'react';
import './index.less';
import ImageLazy from '@/components/ImageLazy';
import AudioController from '@/components/Audio/Controller';
import AudioPlayType from '@/components/Audio/PlayType';
import MusicVolume from '@/components/Audio/Volume';
import { Tooltip } from 'antd';
import AudioProgressBar from '@/components/Audio/ProgressBar';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { audio_isDragProgressBar } from '@/recoil/audio';
import AuthorTags from '@/components/AuthorTags';
import { music_detail } from '@/recoil/muisc';
import { setting_isShowFullScreenPlayer } from '@/recoil/setting';
import CurrentlyPlaying from '@/layouts/components/MusicPlayer/CurrentlyPlaying';

const MusicPlayer = () => {
    const musicDetail = useRecoilValue(music_detail);
    const isDragProgressBar = useRecoilValue(audio_isDragProgressBar);
    const setIsLyricsView = useSetRecoilState(setting_isShowFullScreenPlayer);
    return (
        <div className={'musicPlayer gaussianBlur'}>
            {musicDetail !== null && (
                <AudioProgressBar
                    className={[
                        'musicPlayer-progressBar',
                        isDragProgressBar ? 'active' : '',
                    ].join(' ')}
                />
            )}
            <div className="musicPlayer-container">
                <div className="musicPlayer-Info">
                    {musicDetail !== null && (
                        <>
                            <ImageLazy
                                className={'musicPlayer-coverPicture'}
                                src={musicDetail.coverPicture}
                            />
                            <div className="musicPlayer-content">
                                <p className="musicPlayer-name text-1LinesHide">
                                    {musicDetail.name}
                                </p>
                                <p className="musicPlayer-author text-1LinesHide">
                                    <AuthorTags authors={musicDetail.authors} />
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <div className="musicPlayer-controller">
                    <AudioController />
                </div>
                <div className="musicPlayer-otherAction">
                    {musicDetail !== null && (
                        <>
                            <AudioPlayType />
                            <MusicVolume />
                            <Tooltip placement="top" title="下载">
                                <i className="musicPlayer-icon-download iconfont icon-xiazai" />
                            </Tooltip>
                            <Tooltip placement="top" title="播放列表">
                                <i
                                    className={[
                                        'musicPlayer-playList iconfont icon-bofangliebiao',
                                    ].join(' ')}
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="展开">
                                <i
                                    onClick={() => setIsLyricsView(true)}
                                    className={[
                                        'musicPlayer-expansion iconfont icon-shangjiantou',
                                    ].join(' ')}
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
            </div>
            <CurrentlyPlaying />
        </div>
    );
};

export default MusicPlayer;
