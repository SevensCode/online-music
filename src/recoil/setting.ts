import { atom } from 'recoil';

// 是否显示全屏播放器
export const setting_isShowFullScreenPlayer = atom<boolean>({
    key: 'setting_isShowFullScreenPlayer',
    default: false,
});
