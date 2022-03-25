import request from '@/utils/request';

export class MvRequst {
    // 独家放送
    static exclusiveBroadcast = () =>
        request.get('/personalized/privatecontent');
}
