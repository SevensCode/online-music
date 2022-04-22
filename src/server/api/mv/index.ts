import request from '@/server/request'

export class MvRequst {
    // 独家放送
    static exclusiveBroadcast = () =>
        request.get('/personalized/privatecontent')
}
