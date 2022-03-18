import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import './index.less';
import { Button, message } from 'antd';
import store from 'store';
import { STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants';
import { switchTheme } from '@/theme';
import { history, Link } from 'umi';
import { REG_PHONE } from '@/constants/regular';
import { UserRequst } from '@/api/user';
import { useSetRecoilState } from 'recoil';
import { atom_user_info } from '@/recoil/user';
import { useSearchParam } from '@/hooks';
import { User_PhoneLogin_Params } from '@/api/user/params';
import QrCode from '@/pages/Login/QrCode';

const Login: FC = () => {
    const setUserinfo = useSetRecoilState(atom_user_info);
    const redirect = useSearchParam('redirect');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [themeType, setThemeType] = useState(
        store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT,
    );
    // form
    const [form, updateForm] = useState<User_PhoneLogin_Params>({
        phone: '',
        password: '',
    });

    const setTheme = useCallback(() => {
        switchTheme();
        setThemeType(store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT);
    }, []);
    const bindForm = useCallback(
        (
            { target: { value } }: ChangeEvent<HTMLInputElement>,
            key: 'phone' | 'password',
        ) => {
            updateForm({ ...form, [key]: value.trim() });
        },
        [form],
    );

    const login = useCallback(async () => {
        const { password, phone } = form;
        if (!phone) return message.error('请输入手机号！');
        if (!password) return message.error('请输入密码！');
        if (!REG_PHONE.test(phone))
            return message.error('请输入合法的手机号！');
        setSubmitLoading(true);
        const { code, profile } = await UserRequst.phoneLogin({
            password,
            phone,
        }).finally(() => setSubmitLoading(false));
        if (code === 502) return message.error('手机号或密码错误！');
        if (code !== 200) return message.error('服务端的错误！');
        message.success('登录成功 😊');
        setUserinfo(profile);
        history.push(redirect || '/');
    }, [form]);
    return (
        <div className={'login-container'}>
            <div className="login-card gaussianBlur">
                <h1 className={'login-header'}>
                    <span className={'login-line'} />
                    <span className={'login-title'}>Online Music</span>
                    <span className={'login-line'} />
                </h1>
                <main className={'login-main'}>
                    <div className="login-form">
                        <div className="login-form-label">
                            <i className={'iconfont icon-shoujihao'} />
                            <input
                                onChange={(value) => bindForm(value, 'phone')}
                                maxLength={11}
                                placeholder={'手机号'}
                                className="login-form-input"
                            />
                        </div>
                        <div className="login-form-label">
                            <i className={'iconfont icon-ziyuanxhdpi'} />
                            <input
                                onChange={(value) =>
                                    bindForm(value, 'password')
                                }
                                placeholder={'密码'}
                                type={'password'}
                                className="login-form-input"
                            />
                        </div>
                        <Button
                            loading={submitLoading}
                            className={'login-form-submit'}
                            onClick={login}
                            block
                            type="primary"
                        >
                            登录
                        </Button>
                    </div>
                    <QrCode />
                    <div className="login-form-other">
                        {themeType ? (
                            <i
                                onClick={setTheme}
                                className={
                                    'iconfont icon-yueliang login-theme-icon'
                                }
                            />
                        ) : (
                            <i
                                onClick={setTheme}
                                className={
                                    'iconfont icon-icon-test login-theme-icon'
                                }
                            />
                        )}
                        <i
                            onClick={() => history.push(redirect || '/')}
                            className={'iconfont icon-rollback'}
                        />
                        <Link to={'/'}>
                            <i className={'iconfont icon-zhuye'} />
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;
