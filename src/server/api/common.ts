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
