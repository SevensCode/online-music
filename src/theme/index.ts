import store from 'store'
import { STORE_THEME_DARK, STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants'

interface Theme {
    // 字体颜色
    textColor: string,
    // 副字体颜色
    subTextColor: string,
    // 背景颜色
    backgroundColor: string,
    // 副背景颜色
    subBackgroundColor: string,
    // 滚动条颜色
    scrollColor: string,
    // 透明
    transparent: string,
    // 透明背景
    transparentBackground: string,
    // 分割线
    divder: string
}

const dark: Theme = {
    textColor: '#F5F6F7',
    subTextColor: '#d6d7d7',
    backgroundColor: '#242526',
    subBackgroundColor: '#2e3236',
    scrollColor: 'rgba(255, 255, 255, 0.5)',
    transparent: 'rgba(255, 255, 255, 0.1)',
    transparentBackground: 'rgba(36,37,38,.7)',
    divder: 'rgba(255, 255, 255, .06)'
}
const light: Theme = {
    textColor: '#333333',
    subTextColor: '#606770',
    backgroundColor: '#ffffff',
    subBackgroundColor: '#f2f2f2',
    scrollColor: 'rgba(0, 0, 0, 0.5)',
    transparent: 'rgba(0, 0, 0, 0.1)',
    transparentBackground: 'rgba(255,255,255,.7)',
    divder: 'rgba(0, 0, 0, .06)'
}
const { style } = (document.querySelector('body') as HTMLBodyElement)


// 设置黑暗主题
export const setDarkTheme = () => {
    Object.keys(dark).forEach(key => {
        style.setProperty(`--${ key }`, dark[key as keyof Theme])
    })
    store.set(STORE_THEME_KEY, STORE_THEME_DARK)
}
// 设置明亮主题
export const setLightTheme = () => {
    Object.keys(light).forEach(key => {
        style.setProperty(`--${ key }`, light[key as keyof Theme])
    })
    store.set(STORE_THEME_KEY, STORE_THEME_LIGHT)
}

// 切换主题
export const switchTheme = () => {
    store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT ? setDarkTheme() : setLightTheme()
}