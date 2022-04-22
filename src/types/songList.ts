import { MusicDetail } from '@/types/music'
import { Userinfo } from '@/types/user'

export interface SongList {
    id: number
    list: MusicDetail[]
}

// 歌单基本信息
export interface SongListBasicInfo {
    id: number
    // 标题
    name: string
    // 封面图
    coverPicture: string
    // 介绍
    introduce: string
    // 评论数量
    commentCount: number
    // 播放数量
    playCount: number
    // 更新时间
    updateTime: number
    // 标签
    tags: string[]
    // 用户信息
    createUser: Userinfo
}

// 歌单详细信息
export interface SongListDetail extends SongListBasicInfo {
    songList: MusicDetail[]
    // 收藏者
    collectorList: Userinfo[]
}
