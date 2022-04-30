export enum Banner_Params {
    pc,
    android,
    iphone,
    ipad
}

// 评论资源类型
export enum Comment_Resource_Type {
    // 音乐
    music,
    mv,
    // 歌单
    songList,
    // 专辑
    album
}

// 评论操作类型
export enum Comment_Operation_Type {
    // 删除
    remove,
    // 发送
    send,
    // 回复
    reply
}

// 评论参数
export interface Comment_Params {
    t: Comment_Operation_Type
    type: Comment_Resource_Type
    // 对应资源 id
    id: number
    // 内容
    content: string
    // 回复的评论 id (回复评论时必填)
    commentId?: number
}

// 评论点赞类型
export enum Comment_Like_Operation_Type {
    cancel,
    like
}

export interface Comment_Like_Params {
    t: Comment_Like_Operation_Type
    type: Comment_Resource_Type
    // 对应资源 id
    id: number
    // 评论 id (回复评论时必填)
    cid: number
}
