import request from '@/server/request'
import { Request_Comment_Params } from '@/server/api/common'

export class MusicRequest {
    // 新音乐推送
    static getNewMusic = (limit?: number) => request.get('/personalized/newsong', { params: { limit } })
    // 歌词
    static getLyrics = (id: number) => request.get('/lyric', { params: { id } })
    // 获取歌曲详情
    static getDetails = (ids: string) => request.post('/song/detail', { data: { ids } })
    // 获取评论
    static getComments = ({ id, page, limit, before }: Request_Comment_Params) =>
        request.get('/comment/music', {
            params: {
                id,
                offset: (page - 1) * limit,
                before
            }
        })
}
