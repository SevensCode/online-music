import { atom } from 'recoil';
import { Userinfo } from '@/types/atom';

// 用户info
export const atom_user_info = atom<Nullable<Userinfo>>({
    key: 'atom_user_info',
    default: null,
});

// 用户喜欢的音乐id
export const atom_user_likeMusicIds = atom<number[]>({
    key: 'atom_user_likeMusicIds',
    default: [],
});
