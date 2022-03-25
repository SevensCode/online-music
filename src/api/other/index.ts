import request from '@/utils/request';
import { Banner_Params } from '@/api/other/params';

export class OtherRequst {
    // 轮播图
    static getBanner = (type: Banner_Params = Banner_Params.pc) =>
        request.get('/banner', { params: { type } });
}
