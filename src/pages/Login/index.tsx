import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import './index.less';
import { Button, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import store from 'store';
import { STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants';
import { switchTheme } from '@/theme';
import { history, Link, useSelector } from 'umi';
import { REG_PHONE } from '@/constants/regular';
import { phoneLogin } from '@/api/user';
import { UserModelSatae } from '@/models/user';

const Login: FC = (props) => {
    const user = useSelector(
        ({ user }: { user: UserModelSatae }) => user.userinfo,
    );
    console.log(user);
    const qrCodeRef = useRef<HTMLDivElement>(null);
    // 主题类型
    const [themeType, setThemeType] = useState(
        store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT,
    );
    // 二维码是否可见
    const [qrCodeVisible, handleQrCodeVisible] = useState(false);
    // form
    const [form, updateForm] = useState({ phone: '', password: '' });
    // submit loading
    const [isLoading, setLoading] = useState(false);
    const handleQrCode = useCallback((isShow: boolean) => {
        const { current } = qrCodeRef;
        if (isShow) {
            current?.classList.add('visible');
            current?.classList.remove('hidden');
        } else {
            current?.classList.add('hidden');
            current?.classList.remove('visible');
        }
        handleQrCodeVisible(isShow);
    }, []);

    const setTheme = useCallback(() => {
        switchTheme();
        setThemeType(store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT);
    }, []);
    const bindForm = useCallback(
        (
            { target: { value } }: ChangeEvent<HTMLInputElement>,
            key: 'phone' | 'password',
        ) => {
            updateForm({
                ...form,
                [key]: value.trim(),
            });
        },
        [form],
    );
    const login = useCallback(async () => {
        setLoading(true);
        const { password, phone } = form;
        if (!phone) return message.error('请输入手机号！');
        if (!password) return message.error('请输入密码！');
        if (!REG_PHONE.test(phone))
            return message.error('请输入合法的手机号！');
        const data = await phoneLogin({ password, phone }).finally(() =>
            setLoading(false),
        );
        if (data.code !== 200) return message.error('手机号或密码错误！');
        message.success('登录成功 😊');
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
                            loading={isLoading}
                            className={'login-form-submit'}
                            onClick={login}
                            block
                            type="primary"
                        >
                            登录
                        </Button>
                    </div>
                    <div
                        ref={qrCodeRef}
                        className={'login-qrCode gaussianBlur'}
                    >
                        {qrCodeVisible && (
                            <RollbackOutlined
                                onClick={() => handleQrCode(false)}
                                className={'login-qrCode-close'}
                            />
                        )}
                        {!qrCodeVisible && (
                            <i
                                onClick={() => handleQrCode(true)}
                                className={
                                    'iconfont icon-erweima login-qrCode-icon'
                                }
                            />
                        )}
                    </div>

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
                            onClick={history.goBack}
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
