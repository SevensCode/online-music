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

export const parseLyric = (lyr: string, zhLyr?: string) => {
    const lyrics = lyr.split('\n');
    const zhLyrics = zhLyr?.split('\n') || [];
    let lyricObj: { [type: string]: { zhLyric: string; lyric: string } } = {};
    // [00:00.000] 作曲 : 林俊杰
    // 定义正则表达式提取 00:00.000
    const reg1 = /\d*:\d*\.\d*/g;
    // 定义正则表达式提取 [00:00.000]
    const reg2 = /\[\d*:\d*\.\d*]/g;
    const hanldeLyricTime = (lyric: string): number | undefined => {
        // 1.提取时间
        const timeStrArr = lyric.match(reg1);
        if (timeStrArr === null) return;
        // 2. 提取分钟 和 秒数
        const [minute, second] = timeStrArr[0].split(':');
        // 3.合并时间, 将分钟和秒钟都合并为秒钟
        return parseInt(minute) * 60 + parseInt(second);
    };
    lyrics.forEach((lyric) => {
        const time = hanldeLyricTime(lyric);
        if (!time) return;
        // 5.处理歌词,保存数据
        lyricObj[time] = {
            zhLyric: '',
            lyric: lyric.replace(reg2, '').trim(),
        };
    });
    zhLyrics.forEach((lyric) => {
        const time = hanldeLyricTime(lyric);
        if (!time) return;
        lyricObj[String(time)] = {
            zhLyric: lyric.replace(reg2, '').trim(),
            lyric: lyricObj[String(time)].lyric,
        };
    });
    return lyricObj;
};
