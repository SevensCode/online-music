import request from '@/server/request'
import { Request_Page_Params } from '@/server/api/common'

export class SingerRequst {
    static hotSingers = ({ limit, page }: Request_Page_Params) =>
        request.get('/top/artists', {
            params: {
                limit,
                offset: (page - 1) * limit
            }
        })
}
