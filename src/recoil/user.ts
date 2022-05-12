import { atom } from 'recoil'
import { UserBasicInfo } from '@/types/user'
import { STORE_USER_INFO } from '@/constants'
import store from 'store'
// 用户info
export const user_basicInfo = atom<Nullable<UserBasicInfo>>({
    key: 'user_info',
    default: store.get(STORE_USER_INFO) || null
})

// 用户喜欢的音乐id
export const user_likeMusicIds = atom<number[]>({
    key: 'user_likeMusicIds',
    default: []
})
