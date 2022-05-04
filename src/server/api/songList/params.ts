import { Request_Page_Params } from '@/server/api/common'

export interface SongList_GetSongList_Params extends Request_Page_Params {
    cat: string
}
