import { Request_Page_Params } from '@/server/api/common'

export interface SongList_GetSongList_Params extends Request_Page_Params {
    cat: string
}

export interface SongList_Comments_Params extends Request_Page_Params {
    id: number
    // 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
    before?: number
}
