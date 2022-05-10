import request from '@/server/request'
import { Request_Page_Params } from '@/server/api/common'
import { Singer_GetListOfSingersByCategory_Params } from '@/server/api/singer/params'

export class SingerRequst {
    // 热门歌手
    static hotSingers = ({ limit, page }: Request_Page_Params) =>
        request.get('/top/artists', {
            params: {
                limit,
                offset: (page - 1) * limit
            }
        })
    // 按分类查询歌手
    static getListOfSingersByCategory = ({ limit, page, type, initial, area }: Singer_GetListOfSingersByCategory_Params) =>
        request.get('/artist/list', {
            params: {
                limit,
                offset: (page - 1) * limit,
                type,
                initial,
                area
            }
        })
    // 歌手详情
    static getDetail = (id: number) => request.get('/artist/detail', { params: { id } })
    // 歌手热门50首歌曲
    static getTop50Musics = (id: number) => request.get('/artist/top/song', { params: { id } })
    // 歌手描述
    static getDescription = (id: number) => request.get('/artist/desc', { params: { id } })
}
