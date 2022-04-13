// 是否和上次字符串一样
import { MusicDetails } from '@/recoil/types/audio';

export const whetherAndLastTimeStringSame = (): ((str?: string) => boolean) => {
    let lastStr: string | undefined;
    return (newStr): boolean => {
        if (lastStr !== newStr) {
            lastStr = newStr;
            return false;
        } else {
            return true;
        }
    };
};

/**
 * 数字转换
 * @param {number} number
 * */
export const numberUnit = (number: number): string | number => {
    const numberStr = number.toString();
    const length = numberStr.length;
    if (length > 4 && length <= 8)
        return numberStr.substring(0, length - 4) + '万';
    else if (length > 8) return numberStr.substring(0, length - 8) + '亿';
    return number;
};

/**
 * 音乐详情格式化
 * */
export const formatMusicDetails = (musicDeatils: any): MusicDetails => {
    const {
        id,
        name,
        picUrl,
        song: { album, artists, duration },
    } = musicDeatils;
    return {
        id,
        name,
        coverPicture: picUrl,
        duration,
        album,
        authors: artists,
    };
};

/**
 * 毫秒转换秒
 * @param {number} millisecond 毫秒
 * */
export const millisecondToSeconds = (millisecond: number) => {};

/**
 * 补零
 * @param {number} number
 * */
export const zeroPadding = (number: number) => {
    if (number === 0) return '00';
    else if (number < 10) return '0' + number;
    return number;
};

/**
 * 秒转时间
 * @param {number} second
 * */
export const secondTurnTime = (second: number) => {
    return {
        minute: zeroPadding(Math.floor(second / 60)),
        second: zeroPadding(parseInt(String(second % 60))),
    };
};

/**
 * 毫秒转时间
 * @param {number} millisecond
 * */
export const millisecondTurnTime = (millisecond: number) => {
    const minute = Math.floor(millisecond / 1000 / 60);
    const second = Math.floor(millisecond / 1000) % 60;
    return { minute: zeroPadding(minute), second: zeroPadding(second) };
};
