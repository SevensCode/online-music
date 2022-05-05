// 音乐详情
export interface MusicDetail {
    // 名称
    name: string
    // 封面图
    coverPicture: string
    // 作者
    authors: { name: string; id: number }[]
    // 专辑
    album: {
        name: string
        id: number
    }
    // 时长
    duration: number
    id: number
    // 是否vip
    isVip: boolean
    // 是否有版权
    isCopyright: boolean
}

// 音乐播放时间
export interface MusicTime {
    minute: number | string
    second: number | string
}

// 音乐歌词
export type MusicLyrics = {
    time: number | null
    lyric: string
    zhLyric?: string
}
export type MusicLyricsArr = MusicLyrics[]
