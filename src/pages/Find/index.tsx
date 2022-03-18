import React, { FC } from 'react';
import { history } from 'umi';

const Find: FC = (props) => {
    const test = () => {
        history.push({
            pathname: '/login',
            query: {
                redirect: '/find',
            },
        });
    };
    return (
        <div>
            <button onClick={test}>test</button>
        </div>
    );
};

export default Find;
