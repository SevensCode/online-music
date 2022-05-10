export interface MvDetail {
    // 名称
    name: string
    // id
    id: number
    // 封面图
    cover: string
    // 封面图
    imgurl: string
    // 介绍
    desc: string
    // 播放数
    playCount: number
    // 发布时间
    publishTime: string
    // 评论数
    commentCount: number
    // 收藏数量
    subCount: number
    // 分享数量
    shareCount: number
    // 类型 tags
    tags: { name: string; id: number }[]
    // 作者 名称
    artistName: string
    // 作者 id
    artistId: number
}
