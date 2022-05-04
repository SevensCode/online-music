import request from '@/server/request'
import { Request_Before_Params, Request_Comment_Params } from '@/server/api/common'
import { SongList_GetSongList_Params } from '@/server/api/songList/params'

export class SongListRequst {
    // 推荐歌单
    static getRecommended = (limit?: number) => request.get('/personalized', { params: { limit } })
    // 排行榜
    static getLeaderboard = () => request.get('/toplist')
    // 精品歌单
    static getBoutique = (params: Request_Before_Params) => request.get('/top/playlist/highquality', { params })
    // 热门歌单分类
    static getPopularCategory = () => request.get('/playlist/hot')
    // 歌单分类
    static getCategory = () => request.get('/playlist/catlist')
    // 歌单（网友精选碟）
    static getSongList = ({ page, limit, cat }: SongList_GetSongList_Params) =>
        request.get('/top/playlist', {
            params: {
                limit,
                offset: (page - 1) * limit,
                cat
            }
        })
    // 获取歌单详情
    static getDetail = (id: number) => request.get('/playlist/detail', { params: { id } })
    // 获取歌单所有歌曲 （歌单音乐数量小于100时使用）
    static getAllMusic = (id: number) => request.get('/playlist/track/all', { params: { id } })
    // 收藏/取消收藏歌单 (1:收藏,2:取消收藏)
    static subscribedAction = (id: number, type: 1 | 2) =>
        request.post('/playlist/subscribe', {
            data: {
                id,
                t: type
            }
        })
    // 获取评论
    static getComments = ({ id, limit, page, before }: Request_Comment_Params) =>
        request.get('/comment/playlist', {
            params: {
                id,
                offset: (page - 1) * limit,
                before
            }
        })
    // 获取相似歌单
    static getSimilarSongList = (id: number) => request.get('/simi/playlist', { params: { id } })
}
