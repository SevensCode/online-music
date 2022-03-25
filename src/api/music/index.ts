import request from '@/utils/request';

export class MusicRequest {
    // 新音乐推送
    static newMusicPush = (limit?: number) =>
        request.get('/personalized/newsong', { params: { limit } });
}
