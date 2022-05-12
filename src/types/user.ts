import { Gender } from '@/types/common'

// 用户信息
export interface UserBasicInfo {
    // 用户 id
    userId: number
    // 昵称
    nickname: string
    // 头像
    avatarUrl: string
    // 省
    province: number
    // 城市
    city: number
    // 背景图片
    backgroundUrl: string
    // 签名
    signature: string
    // 性别
    gender: Gender
    // 生日
    birthday: number
    // 创建日期
    createTime: number
}

// 用户详细信息
export interface UserDetail extends UserBasicInfo {
    // 粉丝数量
    fanCount: number
    // 动态数量
    dynamicCount: number
    // 关注数量
    likeCount: number
    // 等级
    grade: number
    // 歌单数量
    songListCount: number
    // 歌单被收藏次数
    songListtBeSubscribedCount: number
}
