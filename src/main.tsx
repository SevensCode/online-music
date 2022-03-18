import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';

const Main: FC = ({ children }) => {
    return (
        <>
            <RecoilRoot>{children}</RecoilRoot>
        </>
    );
};

export default Main;
