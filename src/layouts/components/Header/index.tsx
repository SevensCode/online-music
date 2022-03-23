import React, { FC } from 'react';
import Menu from './Menu';
import './index.less';
import UserBasicInfo from '@/layouts/components/Header/UserBasicInfo';
import { Switch } from 'antd';
import { switchTheme } from '@/theme';
import { STORE_THEME_DARK, STORE_THEME_KEY } from '@/constants';
import store from 'store';
import Search from '@/layouts/components/Header/Search';

const Header: FC = () => {
    return (
        <div className={'layout-header gaussianBlur'}>
            <div className="header-main">
                <Menu />
                <div className={'header-right'}>
                    <Search />
                    <Switch
                        onChange={() => switchTheme()}
                        defaultChecked={
                            store.get(STORE_THEME_KEY) === STORE_THEME_DARK
                        }
                        className={'themeSwitching'}
                        checkedChildren={
                            <i
                                style={{ color: '#FFB948' }}
                                className={'iconfont icon-yueliang'}
                            />
                        }
                        unCheckedChildren={
                            <i
                                style={{ color: '#FFB948' }}
                                className={'iconfont icon-icon-test'}
                            />
                        }
                    />
                    <UserBasicInfo />
                </div>
            </div>
        </div>
    );
};

export default Header;
