import React, { useCallback, useEffect, useState } from 'react';
import MusicCell from '@/components/MusicCell';
import { MusicRequest } from '@/api/music';
import { formatMusicDetails } from '@/utils';
import { useAudioPause, useAudioPlay } from '@/hooks/audio';
import { MusicDetails } from '@/recoil/types/audio';
// 获取新音乐
const getNewMusic = async () => {
    const { result } = await MusicRequest.newMusicPush(50);
    return result || [];
};
const NewMusice = () => {
    const audioPlay = useAudioPlay();
    const audioPause = useAudioPause();
    // 新音乐列表
    const [newMusicList, setNewMusicList] = useState<any[]>([]);
    useEffect(() => {
        getNewMusic().then((value) => setNewMusicList(value));
    }, []);
    const onPlay = useCallback((musicDetails: MusicDetails) => {
        audioPlay(musicDetails);
    }, []);
    const onPause = useCallback(() => {
        audioPause();
    }, []);
    return (
        <div className="find-newMusicPush-container">
            {newMusicList.map((item) => {
                const details = formatMusicDetails(item);
                const { id, coverPicture, name, album, authors } = details;
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
                        onPlay={() => onPlay(details)}
                        onPaused={onPause}
                    />
                );
            })}
        </div>
    );
};

export default NewMusice;
