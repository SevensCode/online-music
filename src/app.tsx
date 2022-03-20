import store from 'store';
import { STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants';
import { setDarkTheme, setLightTheme } from '@/theme';

export const render = (oldRender: any) => {
    // 设置主题
    store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT
        ? setLightTheme()
        : setDarkTheme();
    oldRender();
};
