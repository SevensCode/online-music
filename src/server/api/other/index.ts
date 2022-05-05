import request from '@/server/request'
import { Banner_Params, Comment_Like_Params, Comment_Params } from '@/server/api/other/params'

export class OtherRequst {
    // 轮播图
    static getBanner = (type: Banner_Params = Banner_Params.pc) => request.get('/banner', { params: { type } })
    // 发送/删除评论
    static commentAction = (data: Comment_Params) => request.post('/comment', { data })
    // 评论点赞
    static like = (data: Comment_Like_Params) => request.post('/comment/like', { data })
}
