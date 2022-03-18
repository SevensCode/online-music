/**
 * @description 手机号登录
 * */
// 手机号登录
export interface User_PhoneLogin_Params {
    phone: string;
    password: string;
}

// 生成二维码
export interface User_GenerateQRCode_Params {
    key: string;
    qrimg: boolean;
}
