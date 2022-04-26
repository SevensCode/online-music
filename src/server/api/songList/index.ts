import request from '@/server/request'
import { Request_Before_Params } from '@/server/api/common'
import { SongList_GetSongList_Params } from '@/server/api/songList/params'

export class SongListRequst {
    // 推荐歌单
    static getRecommendedPlaylist = (limit?: number) =>
        request.get('/personalized', { params: { limit } })
    // 排行榜
    static getLeaderboard = () => request.get('/toplist')
    // 精品歌单
    static getBoutiquePlaylist = (params: Request_Before_Params) =>
        request.get('/top/playlist/highquality', { params })
    // 热门歌单分类
    static getPopularPlaylistCategory = () => request.get('/playlist/hot')
    // 歌单分类
    static getPlaylistCategory = () => request.get('/playlist/catlist')
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
    static getSongListDetail = (id: number) =>
        request.get('/playlist/detail', { params: { id } })
    // 获取歌单所有歌曲 （歌单音乐数量大于100时使用）
    static getSongListAllMusic = (id: number) =>
        request.get('/playlist/track/all', { params: { id } })
}
