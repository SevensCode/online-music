import React, {
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Loading } from '@/types/common';

/**
 * 点击空白取隐藏元素
 * */
export const useClickOnBlankHiddenElement = <E extends HTMLElement>(): [
    RefObject<E>,
    boolean,
    (value: ((prevState: boolean) => boolean) | boolean) => void,
] => {
    const [isShow, handle] = useState(false);
    const elementRef = useRef<E>(null);
    const elementCallback = useCallback((e: MouseEvent) => {
        handle(!!elementRef.current?.contains(e.target as Node));
    }, []);
    useEffect(() => {
        isShow
            ? document.body.addEventListener('click', elementCallback)
            : document.body.removeEventListener('click', elementCallback);
    }, [isShow]);

    return [elementRef, isShow, handle];
};
// 追踪浏览器的位置搜索参数
export const useSearchParam = (key: string) => {
    const getValue = useCallback(
        () => new URLSearchParams(window.location.search).get(key),
        [key],
    );

    const [value, setValue] = useState(getValue);

    useEffect(() => {
        const onChange = () => {
            setValue(getValue());
        };
        window.addEventListener('popstate', onChange);
        window.addEventListener('pushstate', onChange);
        window.addEventListener('replacestate', onChange);

        return () => {
            window.removeEventListener('popstate', onChange);
            window.removeEventListener('pushstate', onChange);
            window.removeEventListener('replacestate', onChange);
        };
    }, []);

    return value;
};

// loading状态
export const useStatus = (): [Loading, () => void, () => void, () => void] => {
    const [status, setStatus] = useState<Loading>({
        loading: true,
        success: false,
        error: false,
    });
    const loading = useCallback(() => {
        setStatus({ loading: true, success: false, error: false });
    }, [status]);
    const success = useCallback(() => {
        setStatus({ loading: false, success: true, error: false });
    }, [status]);
    const error = useCallback(() => {
        setStatus({ loading: false, success: false, error: true });
    }, [status]);
    return [status, loading, success, error];
};

// 滚动到指定位置
export const useScroll = <E extends HTMLElement>(): ((
    el: E,
    to: number,
    duration: number,
) => void) => {
    const cubic = (value: number) => Math.pow(value, 3);
    const easeInOutCubic = (value: number) =>
        value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
    return useCallback((el: E, to: number, duration: number = 500) => {
        const beginTime = Date.now();
        const frame = () => {
            const beginValue = el.scrollTop;
            const progress = (Date.now() - beginTime) / duration;
            if (beginValue <= to) {
                el.scrollTop += easeInOutCubic(progress);
                requestAnimationFrame(frame);
            }
        };
        requestAnimationFrame(frame);
    }, []);
};
