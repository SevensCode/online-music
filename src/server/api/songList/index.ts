import request from '@/server/request'
import { Request_Before_Params } from '@/server/api/common'

export class SongListRequst {
    // 推荐歌单
    static getRecommendedPlaylist = (limit?: number) =>
        request.get('/personalized', { params: { limit } })
    // 排行榜
    static getLeaderboard = () => request.get('/toplist')
    // 精品歌单
    static getBoutiquePlaylist = (params: Request_Before_Params) =>
        request.get('/top/playlist/highquality', { params })
}
