import { atom } from 'recoil';
import { Userinfo } from '@/recoil/types/user';

// 用户info
export const user_info = atom<Nullable<Userinfo>>({
    key: 'user_info',
    default: null,
});

// 用户喜欢的音乐id
export const user_likeMusicIds = atom<number[]>({
    key: 'user_likeMusicIds',
    default: [],
});
