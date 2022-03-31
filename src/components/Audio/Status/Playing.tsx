import React, { FC, useState } from 'react';
import './index.less';
import { useRecoilValue } from 'recoil';
import { atom_auido_status } from '@/recoil/audio';

interface Props {
    className?: string;
    onClick?: () => void;
}

const AudioStatusPlaying: FC<Props> = ({ className, onClick }) => {
    const audioStatus = useRecoilValue(atom_auido_status);

    const [isShow, change] = useState(false);
    const mouseOut = () => {
        if (audioStatus === 3) return false;
        change(false);
    };
    const mouseOver = () => {
        change(true);
    };
    return (
        <div
            onClick={onClick}
            className={['audioStatus', 'playing', className].join(' ')}
            onMouseOut={mouseOut}
            onMouseOver={mouseOver}
        >
            {isShow ? (
                <i className="pause iconfont icon-zanting2" />
            ) : (
                <React.Fragment>
                    <i className="playing-line" />
                    <i className="playing-line" />
                    <i className="playing-line" />
                </React.Fragment>
            )}
        </div>
    );
};

export default AudioStatusPlaying;
