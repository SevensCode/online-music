import { atom, selector } from 'recoil'
import { MusicDetail, MusicLyricsArr } from '@/types/music'
import { SongList } from '@/types/songList'

// 音乐详情
export const music_detail = atom<Nullable<MusicDetail>>({
    key: 'music_detail',
    default: null
})

// 歌词
export const music_lyrics = atom<MusicLyricsArr>({
    key: 'music_lyrics',
    default: []
})
// 歌单
export const music_songList = atom<Nullable<SongList>>({
    key: 'music_songList',
    default: null
})

export const music_getMusicIndex = selector<number | null>({
    key: 'music_getMusicIndex',
    get({ get }) {
        const songList = get(music_songList)
        const musicDetail = get(music_detail)
        if (songList === null || musicDetail === null) return null
        const index = songList.list.findIndex(
            (item) => item.id === musicDetail.id
        )
        return index === -1 ? null : index
    }
})
