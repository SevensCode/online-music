/**
 * @description 手机号登录
 * */
// 手机号登录
export interface User_PhoneLogin_Params {
    phone: string
    password?: string
    md5_password?: string
}

// 生成二维码
export interface User_GenerateQRCode_Params {
    key: string
    qrimg: boolean
}

// 是否喜欢音乐
export interface User_isLikeMusic_Params {
    id: number
    like: boolean
}
