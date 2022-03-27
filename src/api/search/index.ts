import request from '@/utils/request';

export class SearchRequst {
    // 热搜列表
    static hotSearch = () => request.get('/search/hot');
}
