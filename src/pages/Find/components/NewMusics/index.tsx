import React, { useCallback, useEffect, useState } from 'react';
import MusicCell from '@/components/MusicCell';
import { MusicRequest } from '@/api/music';
import { formatMusicDetail } from '@/utils';
import { useAudioPause, useAudioPlay } from '@/hooks/audio';
import { MusicDetail } from '@/recoil/types/music';
import { useSetRecoilState } from 'recoil';
import { music_songList } from '@/recoil/muisc';
// 获取新音乐
const getNewMusic = async () => {
    const { result } = await MusicRequest.newMusicPush(18);
    return result || [];
};
const NewMusics = () => {
    const audioPlay = useAudioPlay();
    const audioPause = useAudioPause();
    const setSongList = useSetRecoilState(music_songList);
    const [isSetPlayList, hanldeIsSetPlayList] = useState(false);
    // 新音乐列表
    const [newMusicList, setNewMusicList] = useState<MusicDetail[]>([]);
    useEffect(() => {
        getNewMusic().then((value) =>
            setNewMusicList(value.map((item: any) => formatMusicDetail(item))),
        );
    }, []);
    const onPlay = useCallback(
        (musicDetail: MusicDetail) => {
            if (!isSetPlayList) {
                hanldeIsSetPlayList(true);
                console.log(newMusicList);
                setSongList({ id: 0, list: newMusicList });
            }
            audioPlay(musicDetail);
        },
        [isSetPlayList, newMusicList],
    );
    const onPause = useCallback(() => {
        audioPause();
    }, []);
    return (
        <div className="find-newMusicPush-container">
            {newMusicList.map((detail) => {
                const { id, coverPicture, name, album, authors } = detail;
                return (
                    <MusicCell
                        name={name}
                        id={id}
                        authors={authors}
                        coverPicture={coverPicture + '?param=250y250'}
                        key={id}
                        album={{
                            name: album.name,
                            id: album.id,
                        }}
                        onPlay={() => onPlay(detail)}
                        onPaused={onPause}
                    />
                );
            })}
        </div>
    );
};

export default NewMusics;
