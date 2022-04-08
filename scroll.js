const scrollTo = (params = {}) => {
    const baseConfig = {
        duration: 500, // 滚动的动画的时间
        scroller: '', // 滚动容器的 id ，默认为 body
        id: '', // 滚动到指定位置的元素 id
    };
    const config = {
        ...baseConfig,
        ...params,
    };
    const { id, duration, scroller } = config;
    const ele = document.getElementById(id);
    if (ele) {
        const { scrollTop, scrollerOffsetTop } = getScrollTop(scroller);
        // 需要减去滚动容器到顶部的距离，默认滚动容器是 body ，scrollerOffsetTop 的值为 0
        const offsetTop = ele.offsetTop - scrollerOffsetTop;
        let start;
        let timeOff = false;
        const scrollFrame = (timestramp) => {
            if (start === undefined) {
                start = timestramp;
            }
            const elapsed = timestramp - start;
            const offset = getOffset({
                scrollTop,
                offsetTop,
                elapsed,
                duration,
            });
            if (duration - elapsed >= 0) {
                window.requestAnimationFrame(scrollFrame);
                scolling(scroller, offset);
            } else {
                // 最后一帧因为时间判断可能不会执行，补上最后一帧
                if (!timeOff) {
                    scolling(scroller, offsetTop);
                    timeOff = true;
                }
            }
        };
        window.requestAnimationFrame(scrollFrame);
    }
};

const getScrollTop = (scrollerTag) => {
    let scrollTop;
    let scrollerOffsetTop = 0; // 滚动容器距离 body 顶部的距离
    const ele = document.getElementById(scrollerTag);
    if (ele) {
        scrollTop = ele.scrollTop;
        scrollerOffsetTop = ele.offsetTop;
    } else {
        scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
    }
    return { scrollTop, scrollerOffsetTop };
};

const getOffset = (data) => {
    const { scrollTop, offsetTop, elapsed, duration } = data;
    let offset;
    // 判断是向下还是向上滚动
    if (scrollTop > offsetTop) {
        offset = scrollTop - (elapsed / duration) * (scrollTop - offsetTop);
    } else {
        offset = scrollTop + (elapsed / duration) * (offsetTop - scrollTop);
    }
    return offset;
};

const scolling = (scrollerTag, offset) => {
    const scroller = getScroller(scrollerTag);
    scroller.scrollTo(0, offset);
};

const getScroller = (scrollerTag) =>
    document.getElementById(scrollerTag) || window;
