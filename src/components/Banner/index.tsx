import React, {
    Children,
    FC,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import './index.less';
import BannerItem from '@/components/Banner/item';

interface Props {
    autoplay?: boolean;
    delay?: number;
}

export type BannerStatus = 'active' | 'next' | 'prev';
type TriggerTarget = 'page' | 'btn';
const Banner: FC<Props> = ({ autoplay = true, delay = 3000, children }) => {
    // 当前激活的索引
    const [activeIndex, setActiveIndex] = useState(0);
    // 箭头是否可见
    const [arrowVisible, setArrowVisible] = useState(false);
    // 定时器
    const timer = useRef<NodeJS.Timer | null>(null);
    // children 数量 -1
    const itemCount = useMemo(() => Children.count(children) - 1, [children]);
    const offTimer = useCallback(() => {
        clearInterval(timer.current as NodeJS.Timeout);
    }, [timer]);
    const next = useCallback(() => {
        setActiveIndex((oldActiveIndex) => {
            return oldActiveIndex === itemCount ? 0 : oldActiveIndex + 1;
        });
    }, [itemCount]);
    // 下一页
    const handleButNext = useCallback(() => {
        offTimer();
        next();
    }, [itemCount]);
    // 上一页
    const handleButPrevious = useCallback(() => {
        setActiveIndex((oldActiveIndex) =>
            oldActiveIndex === 0 ? itemCount : oldActiveIndex - 1,
        );
    }, [itemCount]);
    // item 状态
    const status = useCallback(
        (i): BannerStatus | undefined => {
            if (activeIndex === i) return 'active';
            if ((activeIndex === itemCount && i === 0) || activeIndex + 1 === i)
                return 'next';
            if ((activeIndex === 0 && i === itemCount) || activeIndex - 1 === i)
                return 'prev';
        },
        [activeIndex, itemCount],
    );
    const onMouseMove = useCallback(
        (triggerTarget: TriggerTarget, i) => {
            switch (triggerTarget) {
                case 'page':
                    setActiveIndex(i);
                    break;
                case 'btn':
                    setArrowVisible(true);
            }
            offTimer();
        },
        [itemCount],
    );
    const onMouseLeave = useCallback(
        (triggerTarget: TriggerTarget) => {
            switch (triggerTarget) {
                case 'page':
                    break;
                case 'btn':
                    setArrowVisible(false);
            }
            timer.current = setInterval(next, delay);
        },
        [itemCount],
    );
    const page = useMemo(() => {
        const pages = [];
        for (let i = 0; i < itemCount + 1; i++) {
            pages.push(
                <span
                    key={i}
                    className={[
                        'banner-page-item',
                        i === activeIndex ? 'active' : undefined,
                    ].join(' ')}
                    onMouseMove={() => onMouseMove('page', i)}
                    onMouseLeave={() => onMouseLeave('page')}
                />,
            );
        }
        return pages;
    }, [itemCount, activeIndex]);

    useEffect(() => {
        if (!autoplay) return;
        offTimer();
        timer.current = setInterval(next, delay);
    }, [children]);
    useEffect(() => () => offTimer(), []);
    return (
        <div className="banner">
            <div
                className="banner-list"
                onMouseMove={() => onMouseMove('btn', null)}
                onMouseLeave={() => onMouseLeave('btn')}
            >
                {Children.map(children, (child, index) => {
                    if (!isValidElement(child)) return null;
                    if (child.type !== BannerItem) return null;
                    return (
                        <BannerItem status={status(index)}>
                            {child.props.children}
                        </BannerItem>
                    );
                })}
                {arrowVisible && (
                    <>
                        <span
                            onClick={handleButPrevious}
                            className={'banner-previous'}
                        >
                            <i className={'iconfont icon-shangyiye'} />
                        </span>
                        <span onClick={handleButNext} className={'banner-next'}>
                            <i className={'iconfont icon-xiayiye'} />
                        </span>
                    </>
                )}
            </div>
            <div className="banner-page">{page}</div>
        </div>
    );
};
export default Banner;
