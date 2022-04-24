import { Request_Page_Params } from '@/server/api/common'

export interface Singer_GetListOfSingersByCategory_Params
    extends Request_Page_Params {
    //  按首字母索引查找参数  热门传-1,#传 0
    initial: string | number
    // -1:全部 1:男歌手 2:女歌手 3:乐队
    type: number
    // -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
    area: number
}
