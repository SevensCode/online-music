import request from '@/server/request'

export class MusicRequest {
    // 新音乐推送
    static getNewMusic = (limit?: number) => request.get('/personalized/newsong', { params: { limit } })
    // 歌词
    static getLyrics = (id: number) => request.get('/lyric', { params: { id } })
    // 获取歌曲详情
    static getDetails = (ids: string) => request.post('/song/detail', { data: { ids } })
}
