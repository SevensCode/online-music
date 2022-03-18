import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import './index.less';
import { Button, message, Tooltip } from 'antd';
import {
    LoadingOutlined,
    RollbackOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import store from 'store';
import { STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants';
import { switchTheme } from '@/theme';
import { history, Link } from 'umi';
import { REG_PHONE } from '@/constants/regular';
import { UserRequst } from '@/api/user';
import { useSetRecoilState } from 'recoil';
import { atom_user_info } from '@/recoil/user';
import { useSearchParam, useStatus } from '@/hooks';
import { User_PhoneLogin_Params } from '@/api/user/params';

interface Other {
    // 主题类型
    themeType: boolean;
    // 二维码是否可见
    qrCodeVisible: boolean;
    // 提交按钮 loading
    submitLoading: boolean;
    // 二维码url
    qrCodeUrl: string;
    // 二维码状态描述
    qrCodeStatusMessage: string;
}

const Login: FC = () => {
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const timer = useRef<NodeJS.Timer | null>(null);
    const setUserinfo = useSetRecoilState(atom_user_info);
    const redirect = useSearchParam('redirect');
    const [other, setOther] = useState<Other>({
        qrCodeVisible: false,
        submitLoading: false,
        themeType: store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT,
        qrCodeUrl: '',
        qrCodeStatusMessage: '等待扫码！',
    });
    // form
    const [form, updateForm] = useState<User_PhoneLogin_Params>({
        phone: '',
        password: '',
    });
    // 二维码状态
    const [qrCodeStatus, loading, success, error] = useStatus();

    const setTheme = useCallback(() => {
        switchTheme();
        setOther({
            ...other,
            themeType: store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT,
        });
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
        history.goBack();
        const { password, phone } = form;
        if (!phone) return message.error('请输入手机号！');
        if (!password) return message.error('请输入密码！');
        if (!REG_PHONE.test(phone))
            return message.error('请输入合法的手机号！');
        setOther({ ...other, submitLoading: true });
        const { code, profile } = await UserRequst.phoneLogin({
            password,
            phone,
        }).finally(() => setOther({ ...other, submitLoading: false }));
        if (code === 502) return message.error('手机号或密码错误！');
        if (code !== 200) return message.error('服务端的错误！');
        message.success('登录成功 😊');
        setUserinfo(profile);
        history.push(redirect || '/');
    }, [form]);
    // 检测二维码状态
    const detectQRCodeStatus = useCallback(() => {}, [other]);
    const offTimer = useCallback(() => {
        clearInterval(timer.current as NodeJS.Timeout);
        timer.current = null;
    }, []);
    // 生成二维码key
    const generateQRCodeKey = useCallback(async () => {
        const { code, data } = await UserRequst.generateQRCodeKey();
        if (code !== 200) return message.error('二维码生成失败！');
        return data.unikey;
    }, []);
    // 生成二维码
    const generateQRCode = useCallback(async () => {
        // 生成二维码之前先把之前的定时器关闭
        offTimer();
        loading();
        const key = await generateQRCodeKey();
        const { code, data } = await UserRequst.generateQRCode({
            key,
            qrimg: true,
        });
        if (code !== 200) {
            offTimer();
            return error();
        }
        setOther({
            ...other,
            qrCodeUrl: data.qrimg,
            qrCodeStatusMessage: '等待扫码！',
        });
        success();
        timer.current = setInterval(async () => {
            /**
             * 800 二维码已过期
             * 801 等待扫码
             * 802 授权中
             * 803 授权成功
             * */
            const { code: qrCodeStatus } = await UserRequst.detectQRCodeStatus(
                key,
            );
            switch (qrCodeStatus) {
                case 800:
                    setOther({
                        ...other,
                        qrCodeUrl: data.qrimg,
                        qrCodeStatusMessage:
                            '二维码已过期,点击二维码可重新加载！',
                    });
                    offTimer();
                    break;
                case 801:
                    setOther({
                        ...other,
                        qrCodeUrl: data.qrimg,
                        qrCodeStatusMessage: '等待扫码！',
                    });
                    break;
                case 802:
                    setOther({
                        ...other,
                        qrCodeUrl: data.qrimg,
                        qrCodeStatusMessage: '授权中！',
                    });
                    break;
                case 803:
                    const {
                        data: { code, profile },
                    } = await UserRequst.getLoginStatus();
                    if (code !== 200) return message.error('服务端的错误！');
                    offTimer();
                    message.success('登录成功 😊');
                    setUserinfo(profile);
                    history.push(redirect || '/');
                    break;
                default:
                    message.error('系统错误');
            }
        }, 3000);
    }, [other]);

    const handleQrCode = useCallback(
        (isShow: boolean) => {
            const { current } = qrCodeRef;
            if (isShow) {
                current?.classList.add('visible');
                current?.classList.remove('hidden');
            } else {
                current?.classList.add('hidden');
                current?.classList.remove('visible');
            }
            setOther({ ...other, qrCodeVisible: isShow });
        },
        [other],
    );
    useEffect(() => {
        // 生成二维码
        other.qrCodeVisible && !other.qrCodeUrl && generateQRCode();
        if (other.qrCodeVisible && !other.qrCodeUrl) {
            console.log('899');
        }
    }, [other.qrCodeVisible, other.qrCodeUrl]);
    //  页面关闭时 清除定时器
    useEffect(() => () => clearInterval(timer.current as NodeJS.Timeout), []);
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
                            loading={other.submitLoading}
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
                        {other.qrCodeVisible && (
                            <>
                                <RollbackOutlined
                                    onClick={() => handleQrCode(false)}
                                    className={'login-qrCode-close'}
                                />
                                {qrCodeStatus.loading && (
                                    <>
                                        <LoadingOutlined className="login-qrCode-loading" />
                                        <span className="login-qrCode-loadingText">
                                            加载中...
                                        </span>
                                    </>
                                )}
                                {qrCodeStatus.error && (
                                    <>
                                        <WarningOutlined
                                            onClick={generateQRCode}
                                            className="login-qrCode-loading error"
                                        />
                                        <span
                                            onClick={generateQRCode}
                                            className="login-qrCode-loadingText"
                                        >
                                            加载失败,点击重新加载
                                        </span>
                                    </>
                                )}
                                {qrCodeStatus.success && (
                                    <>
                                        <p className="login-qrCode-status">
                                            {other.qrCodeStatusMessage}
                                        </p>
                                        <Tooltip title={'点击重新生成二维码'}>
                                            <img
                                                className="login-qrCode-img"
                                                onClick={generateQRCode}
                                                src={other.qrCodeUrl}
                                                alt=""
                                            />
                                        </Tooltip>
                                    </>
                                )}

                                <h3 className="login-qrCode-prompt">
                                    使用网易云App进行扫码登录
                                </h3>
                            </>
                        )}
                        {!other.qrCodeVisible && (
                            <i
                                onClick={() => handleQrCode(true)}
                                className={
                                    'iconfont icon-erweima login-qrCode-icon'
                                }
                            />
                        )}
                    </div>

                    <div className="login-form-other">
                        {other.themeType ? (
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
