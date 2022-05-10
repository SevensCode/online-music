import request from '@/server/request'
import { Search_Params } from '@/server/api/search/params'

export class SearchRequst {
    // 热搜列表
    static hotSearch = () => request.get('/search/hot')
    // 搜索
    static search = ({ keywords, limit, page, type }: Search_Params) =>
        request.get('/search', {
            params: {
                keywords,
                limit,
                type,
                offset: (page - 1) * limit
            }
        })
}
