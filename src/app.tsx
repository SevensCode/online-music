import store from 'store'
import { STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants'
import { setDarkTheme, setLightTheme } from '@/theme'

export const render = (oldRender: any) => {
    if (store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT) {
        setLightTheme()
    } else {
        setDarkTheme()
    }
    oldRender()
}