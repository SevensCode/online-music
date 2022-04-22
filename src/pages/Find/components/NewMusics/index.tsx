import React, { useCallback, useEffect, useState } from 'react'
import MusicCell from '@/components/MusicCell'
import { MusicRequest } from '@/server/api/music'
import { formatMusicDetail } from '@/utils'
import { useAudio } from '@/hooks/audio'
import { MusicDetail } from '@/types/music'
import { useRecoilState, useRecoilValue } from 'recoil'
import { music_detail, music_songList } from '@/recoil/muisc'
// 获取新音乐
const getNewMusic = async () => {
    const { result } = await MusicRequest.newMusicPush(18)
    return result || []
}

const NewMusics = () => {
    const { audioPlay } = useAudio()
    const [songList, setSongList] = useRecoilState(music_songList)
    const musicDetail = useRecoilValue(music_detail)
    const [isSetPlayList, hanldeIsSetPlayList] = useState(false)
    // 新音乐列表
    const [newMusicList, setNewMusicList] = useState<MusicDetail[]>([])
    useEffect(() => {
        getNewMusic().then((value) =>
            setNewMusicList(value.map((item: any) => formatMusicDetail(item)))
        )
    }, [])
    const onPlay = useCallback(
        (musicDetail: MusicDetail) => {
            if (!isSetPlayList || songList === null) {
                hanldeIsSetPlayList(true)
                setSongList({ id: 0, list: newMusicList })
            }
            audioPlay(musicDetail)
        },
        [isSetPlayList, newMusicList, songList]
    )
    const isActive = useCallback(
        (id) => {
            if (musicDetail === null) return false
            return musicDetail.id === id
        },
        [musicDetail]
    )
    return (
        <div className='find-newMusicPush-container'>
            {newMusicList.map((detail) => {
                const { id, coverPicture, name, album, authors } = detail
                return (
                    <MusicCell
                        isActive={isActive(id)}
                        name={name}
                        id={id}
                        authors={authors}
                        coverPicture={coverPicture + '?param=250y250'}
                        key={id}
                        album={{
                            name: album.name,
                            id: album.id
                        }}
                        onPlay={() => onPlay(detail)}
                    />
                )
            })}
        </div>
    )
}

export default NewMusics
