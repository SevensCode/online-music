import request from '@/utils/request';
import { Banner_Params } from '@/api/other/params';

export class OtherRequst {
    static getBanner = (type: Banner_Params = Banner_Params.pc) =>
        request.post('/banner', { data: { type } });
}
