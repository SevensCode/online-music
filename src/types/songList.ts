import { MusicDetail } from '@/types/music'
import { UserBasicInfo } from '@/types/user'

export interface SongList {
    id: number
    list: MusicDetail[]
}

// 歌单基本信息
export interface SongListDetail {
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
    // 音乐数量
    musicCount: number
    // 更新时间
    updateTime: number
    // 标签
    tags: string[]
    // 用户信息
    createUser: UserBasicInfo
    // 音乐id
    musicId: number[]
    // 是否收藏
    subscribed: boolean
    // 收藏数量
    subscribedCount: number
}
