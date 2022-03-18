import { atom } from 'recoil';
import { Userinfo } from '@/types/atom';

export const atom_user_info = atom<Nullable<Userinfo>>({
    key: 'atom_user_info',
    default: null,
});
