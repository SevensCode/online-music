declare module 'tool'

// 是否和上次字符串一样
export function whetherAndLastTimeStringSame(): (str?: string) => boolean

/**
 * 数字转换
 * @param {number} number
 * */
export function numberUnit(number: number): string | number

/**
 * 补零
 * @param {number} number
 * */
export function zeroPadding(number: number): string | number

/**
 * 秒转时间
 * @param {number} second
 * */
export function secondTurnTime(second: number): { minute: string | number; second: string | number }

/**
 * 毫秒转时间
 * @param {number} millisecond
 * */
export function millisecondTurnTime(millisecond: number): { minute: string | number; second: string | number }

/**
 * 随机数
 * @param {array} range 最小值
 * @param {number|array} exclude
 * */
export function randomInteger(range: [number, number], exclude: number[]): number

/**
 * 计算行数
 * */
export function computeLineCount(el: HTMLElement): number

/**/
export function scrollToElement(scrollContainer: HTMLElement, element: HTMLElement, duration?: number, offset?: number): void
