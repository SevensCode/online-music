import { atom } from 'recoil'

// 是否显示全屏播放器
export const setting_fullScreenPlayerVisible = atom<boolean>({
    key: 'setting_fullScreenPlayerVisible',
    default: false
})
