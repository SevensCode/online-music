import React, { FC } from 'react';
import { NavLink } from 'umi';
import './index.less';

const menuRouters = [
    {
        path: '/',
        title: '发现',
    },
    {
        path: '/leaderboard',
        title: '排行榜',
    },
    {
        path: '/singer',
        title: '歌手',
    },
];
const Menu: FC = () => {
    return (
        <div className={'header-menu'}>
            {menuRouters.map((value) => (
                <NavLink
                    exact
                    activeClassName={'header-menu-item-active'}
                    className={'header-menu-item'}
                    key={value.path}
                    to={value.path}
                >
                    {value.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Menu;
