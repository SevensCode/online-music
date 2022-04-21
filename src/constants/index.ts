// 主题
export const STORE_THEME_KEY = 'M-THEME'

// 明亮主题
export const STORE_THEME_LIGHT = 'LIGHT'

// 黑暗主题
export const STORE_THEME_DARK = 'DARK'

// 用户信息
export const STORE_USER_INFO = 'M-USERINFO'

// 搜索历史
export const STORE_SEARCH_HISTORY = 'M_SEARCH_HISTORY'

// 音量
export const STORE_AUDIO_VOLUME = 'M_VOLUME'

// 播放类型
export const STORE_PLAY_TYPE = 'M_PLAY_TYPE'

/**
 * 播放类型： 0 顺序播放 1 列表循环 2 单曲循环 3 随机播放 4 心动模式
 * */
export const AUDIO_PLAY_TYPE = [
    {
        name: '顺序播放',
        icon: 'icon-shunxubofang'
    },
    {
        name: '列表循环',
        icon: 'icon-liebiaoxunhuan'
    },
    {
        name: '单曲循环',
        icon: 'icon-danquxunhuan'
    },
    {
        name: '随机播放',
        icon: 'icon-suijibofang'
    }
]
