export interface AlbumDetail {
    // 别名
    alias: string[]
    // 名称
    name: string
    // 作者
    auther: { name: string; id: number }
    // 类型
    type: string
    // 子类型
    subType: string
    // 封面图
    coverPicture: string
    // 介绍
    description: string
    // 发布时间
    publishTime: number
    id: number
}
