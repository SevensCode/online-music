// 是否和上次字符串一样
export const whetherAndLastTimeStringSame = () => {
    let lastStr
    return newStr => {
        if (lastStr !== newStr) {
            lastStr = newStr
            return false
        } else {
            return true
        }
    }
}

/**
 * 数字转换
 * @param {number} number
 * */
export const numberUnit = number => {
    const numberStr = number.toString()
    const length = numberStr.length
    if (length > 4 && length <= 8) return numberStr.substring(0, length - 4) + '万'
    else if (length > 8) return numberStr.substring(0, length - 8) + '亿'
    return number
}

/**
 * 补零
 * @param {number} number
 * */
export const zeroPadding = number => {
    if (number === 0) return '00'
    else if (number < 10) return '0' + number
    return number
}

/**
 * 秒转时间
 * @param {number} second
 * */
export const secondTurnTime = second => {
    return {
        minute: zeroPadding(Math.floor(second / 60)),
        second: zeroPadding(parseInt(String(second % 60)))
    }
}

/**
 * 毫秒转时间
 * @param {number} millisecond
 * */
export const millisecondTurnTime = millisecond => {
    const minute = Math.floor(millisecond / 1000 / 60)
    const second = Math.floor(millisecond / 1000) % 60
    return { minute: zeroPadding(minute), second: zeroPadding(second) }
}

/**
 * 随机数
 * @param {array} range 最小值
 * @param {number|array} exclude
 * */
export const randomInteger = (range = [0, 100], exclude = []) => {
    const random = Math.round(Math.random() * (range[1] - range[0]) + range[0])
    return exclude.includes(random) ? randomInteger(range, exclude) : random
}
/**
 * 计算行数
 * */
export const computeLineCount = el => {
    const computedStyle = getComputedStyle(el, null)
    const lineHeight = (computedStyle.lineHeight === 'normal' ? computedStyle.fontSize : computedStyle.lineHeight).replace('px', '')
    const height = el.offsetHeight
    return Math.ceil(Number(height) / Number(lineHeight))
}

/**
 * 滚动到指定元素位置
 * */
export const scrollToElement = (scrollContainer, element, duration = 500, offset = 0) => {
    const getScrollTop = scrollerTag => {
        let scrollTop
        let scrollerOffsetTop = 0 // 滚动容器距离 body 顶部的距离
        if (scrollerTag) {
            scrollTop = scrollerTag.scrollTop
            scrollerOffsetTop = scrollerTag.offsetTop
        } else {
            scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        }
        return { scrollTop, scrollerOffsetTop }
    }

    const getOffset = data => {
        const cubic = value => Math.pow(value, 3)
        const easeInOutCubic = value => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2)
        const { scrollTop, offsetTop, elapsed, duration } = data
        let offset
        // 判断是向下还是向上滚动
        scrollTop > offsetTop
            ? (offset = Math.floor(scrollTop - easeInOutCubic(elapsed / duration) * (scrollTop - offsetTop)))
            : (offset = Math.ceil(scrollTop + easeInOutCubic(elapsed / duration) * (offsetTop - scrollTop)))
        return offset
    }

    if (element) {
        const { scrollTop, scrollerOffsetTop } = getScrollTop(scrollContainer)
        // 需要减去滚动容器到顶部的距离，默认滚动容器是 body ，scrollerOffsetTop 的值为 0
        const offsetTop = element.offsetTop - scrollerOffsetTop + offset
        let start
        const scrollFrame = timestramp => {
            if (start === undefined) {
                start = timestramp
            }
            const elapsed = timestramp - start
            const offset = getOffset({
                scrollTop,
                offsetTop,
                elapsed,
                duration
            })
            if (duration - elapsed >= 0) {
                window.requestAnimationFrame(scrollFrame)
                const scroller = scrollContainer || window
                scroller.scrollTo(0, offset)
            }
        }
        window.requestAnimationFrame(scrollFrame)
    }
}
