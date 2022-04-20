import { atom } from 'recoil'
import { MusicTime } from '@/recoil/types/music'
import { STORE_AUDIO_VOLUME, STORE_PLAY_TYPE } from '@/constants'
import store from 'store'

/**
 * 播放类型： 0 顺序播放 1 列表循环 2 单曲循环 3 随机播放 4 心动模式
 * */
export const audio_playType = atom<number>({
    key: 'audio_playType',
    default: store.get(STORE_PLAY_TYPE) || 0
})

// 音频实例
export const audio_instance = atom({
    key: 'audio_instance',
    default: new Audio()
})

// 播放器状态
export const auido_status = atom<number>({
    key: 'auido_status',
    default: 0 // 0未播 1加载中 2播放中
})

// 进度条是否被拖动
export const audio_isDragProgressBar = atom<boolean>({
    key: 'audio_isDragProgressBar',
    default: false
})

// 进度条值
export const audio_progressBarValue = atom<number>({
    key: 'audio_progressBarValue',
    default: 0
})

// 播放总时间
export const audio_totalPlayTime = atom<MusicTime>({
    key: 'audio_totalPlayTime',
    default: { minute: 0, second: 0 }
})

// 播放进度时间
export const audio_playProgressTime = atom<MusicTime>({
    key: 'audio_playProgressTime',
    default: { minute: 0, second: 0 }
})

// 音量
export const audio_volume = atom<number>({
    key: 'audio_volume',
    default: store.get(STORE_AUDIO_VOLUME) ?? 50
})
