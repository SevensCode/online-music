// 搜索类型
import { Request_Page_Params } from '@/server/api/common'

export enum SearchType {
    // 音乐
    music = 1,
    // 专辑
    album = 10,
    // 歌手
    singer = 100,
    // 歌单
    songList = 1000,
    // mv
    mv = 1004
}

export interface Search_Params extends Request_Page_Params {
    type: SearchType
    keywords: string
}
