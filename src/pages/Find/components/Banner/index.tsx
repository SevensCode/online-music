import React, { FC, useMemo } from 'react';
import './index.less';

interface Props {
    autoplay?: boolean;
    delay?: number;
}

const Banner: FC<Props> = ({ autoplay = true, delay = 3000, children }) => {
    console.log(children);
    const bannerList = useMemo(() => {
        if (children && children instanceof Array) {
            return children;
        }
    }, [children]);
    return (
        <div className="banner">
            <div className="banner-list">{bannerList}</div>
            <div className="banner-pagination"></div>
        </div>
    );
};

export default Banner;
