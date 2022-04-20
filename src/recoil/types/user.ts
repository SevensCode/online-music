import { Gender } from '@/types/common'

export interface Userinfo {
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
    // 等级
    eventCount: number
}
