import request from '@/server/request'
import { Album_GetSingerAlbum_Params } from '@/server/api/album/params'

export class AlbumRequest {
    // 获取歌手专辑
    static getSingerAlbum = ({ page, limit, id }: Album_GetSingerAlbum_Params) =>
        request.get('/artist/album', {
            params: {
                id,
                limit,
                offset: (page - 1) * limit
            }
        })
    // 获取详情
    static getDetail = (id: number) => request.get('/album', { params: { id } })
}
