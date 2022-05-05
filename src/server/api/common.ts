// 分页接口

export interface Request_Page_Params {
    limit: number
    page: number
}

// 加载更多接口
export interface Request_Before_Params {
    limit: number
    before?: number
}

// 获取评论 音乐 | 歌单 | Mv
export interface Request_Comment_Params extends Request_Page_Params {
    id: number
    // 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
    before?: number
}
