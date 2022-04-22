import request from '@/server/request'

export class SearchRequst {
    // 热搜列表
    static hotSearch = () => request.get('/search/hot')
}
