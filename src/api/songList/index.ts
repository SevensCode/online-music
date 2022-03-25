import request from '@/utils/request';

export class SongListRequst {
    // 推荐歌单
    static getRecommendedPlaylist = (limit?: number) =>
        request.get('/personalized', { params: { limit } });
}
