import request from '@/server/request'
import { Request_Page_Params } from '@/server/api/common'
import { Singer_GetListOfSingersByCategory_Params } from '@/server/api/singer/params'

export class SingerRequst {
    static hotSingers = ({ limit, page }: Request_Page_Params) =>
        request.get('/top/artists', {
            params: {
                limit,
                offset: (page - 1) * limit
            }
        })
    static getListOfSingersByCategory = (
        params: Singer_GetListOfSingersByCategory_Params
    ) => request.get('/artist/list', { params })
}
