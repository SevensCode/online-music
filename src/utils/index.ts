// 是否和上次字符串一样
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
