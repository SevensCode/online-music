import request from '@/server/request'
import { Mv_GetSingerMv_Params } from '@/server/api/mv/params'

export class MvRequst {
    // 独家放送
    static exclusiveBroadcast = () => request.get('/personalized/privatecontent')
    // 获取歌手Mv
    static getSingerMv = ({ id, limit, page }: Mv_GetSingerMv_Params) =>
        request.get('/artist/mv', {
            params: {
                id,
                limit,
                offset: (page - 1) * limit
            }
        })
}
