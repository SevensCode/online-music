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
