export interface Loading {
    loading?: boolean
    success?: boolean
    error?: boolean
}

// 性别
export enum Gender {
    man = 1,
    girl,
    unknown
}

// 尺寸
export type Size = 'middle' | 'large' | 'small'
// 按钮类型
export type ButtonType = 'primary' | 'default' | 'text'

// 评论数据
export interface CommentData {
    // 评论id
    commentId: number
    // 喜欢数量
    likedCount: number
    // 是否喜欢
    liked: boolean
    // 内容
    content: string
    // 时间字符串
    timeStr: string
    // 回复人
    beReplied: [{ user: { nickname: string; userId: number }; content: string }]
    // 用户
    user: { avatarUrl: string; nickname: string; userId: number }
}
