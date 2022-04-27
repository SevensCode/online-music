import store from 'store'
import { STORE_THEME_DARK, STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants'

interface Theme {
    // 字体颜色
    textColor: string
    // 副字体颜色
    subTextColor: string
    // 背景颜色
    backgroundColor: string
    // 副背景颜色
    subBackgroundColor: string
    // 滚动条颜色
    scrollColor: string
    // 透明
    hover: string
    // 透明背景
    transparent: string
    // 分割线
    divder: string
}

const dark: Theme = {
    textColor: '#F5F6F7',
    subTextColor: '#d6d7d7',
    backgroundColor: '#242526',
    subBackgroundColor: '#2e3236',
    scrollColor: 'rgba(255, 255, 255, 0.5)',
    hover: '#343639',
    transparent: 'rgba(36,37,38,.7)',
    divder: 'rgba(255, 255, 255, .06)'
}
// #e8e9ed
const light: Theme = {
    textColor: '#333333',
    subTextColor: '#606770',
    backgroundColor: '#ffffff',
    subBackgroundColor: '#f2f2f2',
    scrollColor: 'rgba(0, 0, 0, 0.5)',
    hover: '#e8e9ed',
    transparent: 'rgba(255,255,255,.7)',
    divder: 'rgba(0, 0, 0, .06)'
}
const { style } = document.querySelector('body') as HTMLBodyElement

// 设置黑暗主题
export const setDarkTheme = () => {
    document.body.classList.add('clearTransition')
    Object.keys(dark).forEach(key => {
        style.setProperty(`--${key}`, dark[key as keyof Theme])
    })
    store.set(STORE_THEME_KEY, STORE_THEME_DARK)
    setTimeout(() => {
        document.body.classList.remove('clearTransition')
    })
}
// 设置明亮主题
export const setLightTheme = () => {
    document.body.classList.add('clearTransition')
    Object.keys(light).forEach(key => {
        style.setProperty(`--${key}`, light[key as keyof Theme])
    })
    store.set(STORE_THEME_KEY, STORE_THEME_LIGHT)
    setTimeout(() => {
        document.body.classList.remove('clearTransition')
    })
}

// 切换主题
export const switchTheme = () => {
    store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT ? setDarkTheme() : setLightTheme()
}
