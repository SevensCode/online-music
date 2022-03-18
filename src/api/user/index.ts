import request from '@/utils/request';
import {
    User_GenerateQRCode_Params,
    User_PhoneLogin_Params,
} from '@/api/user/params';

export class UserRequst {
    // 手机号登录
    static phoneLogin = (data: User_PhoneLogin_Params) =>
        request.post('/login/cellphone', { data });
    // 生成二维码key
    static generateQRCodeKey = () => request.post('/login/qr/key');
    // 生成二维码
    static generateQRCode = (data: User_GenerateQRCode_Params) =>
        request.post('/login/qr/create', { data });
    // 检测二维码状态
    static detectQRCodeStatus = (key: string) =>
        request.post('/login/qr/check', { data: { key } });
    // 获取登陆状态
    static getLoginStatus = () => request.post('/login/status');
}
