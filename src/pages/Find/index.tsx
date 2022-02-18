import React, { FC } from 'react';
import { Button } from 'antd';
import { setDarkTheme, setLightTheme } from '@/theme';

const Find: FC = (props) => {
    const test = () => {
        setDarkTheme();
    };
    const test2 = () => {
        setLightTheme();
    };
    return (
        <div>
            <Button onClick={ test }>dark</Button>
            <Button onClick={ test2 }>light</Button>
        </div>
    );
};

export default Find;