import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import './index.less'
import { Button, message } from 'antd'
import store from 'store'
import {
    STORE_THEME_KEY,
    STORE_THEME_LIGHT,
    STORE_USER_INFO
} from '@/constants'
import { switchTheme } from '@/theme'
import { history, Link } from 'umi'
import { REG_PHONE } from '@/constants/regular'
import { UserRequst } from '@/server/api/user'
import { useSetRecoilState } from 'recoil'
import { user_info } from '@/recoil/user'
import { useSearchParam } from '@/hooks'
import { User_PhoneLogin_Params } from '@/server/api/user/params'
import QrCode from '@/pages/Login/QrCode'
import md5 from 'js-md5'

const Login: FC = () => {
    const setUserinfo = useSetRecoilState(user_info)
    const redirect = useSearchParam('redirect')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [themeType, setThemeType] = useState(
        store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT
    )
    // form
    const [form, updateForm] = useState<User_PhoneLogin_Params>({
        phone: '',
        md5_password: ''
    })

    const setTheme = useCallback(() => {
        switchTheme()
        setThemeType(store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT)
    }, [])
    const bindForm = useCallback(
        (
            { target: { value } }: ChangeEvent<HTMLInputElement>,
            key: 'phone' | 'md5_password'
        ) => {
            updateForm({ ...form, [key]: value.trim() })
        },
        [form]
    )

    const login = useCallback(async () => {
        const { md5_password, phone } = form
        if (!phone) return message.error('请输入手机号！')
        if (!md5_password) return message.error('请输入密码！')
        if (!REG_PHONE.test(phone)) return message.error('请输入合法的手机号！')
        setSubmitLoading(true)
        const { code, profile } = await UserRequst.phoneLogin({
            md5_password: md5(md5_password),
            phone
        }).finally(() => setSubmitLoading(false))
        if (code === 502) return message.error('手机号或密码错误！')
        if (code !== 200) return message.error('服务端的错误！')
        message.success('登录成功 😊')
        setUserinfo(profile)
        store.set(STORE_USER_INFO, profile)
        history.replace(redirect || '/')
    }, [form])
    return (
        <div className={'login-container'}>
            <div className='login-card gaussianBlur'>
                <h1 className={'login-header'}>
                    <span className={'login-line'} />
                    <span className={'login-title'}>Online Music</span>
                    <span className={'login-line'} />
                </h1>
                <main className={'login-main'}>
                    <div className='login-form'>
                        <div className='login-form-label'>
                            <i className={'iconfont icon-shoujihao'} />
                            <input
                                onChange={(value) => bindForm(value, 'phone')}
                                maxLength={11}
                                placeholder={'手机号'}
                                className='login-form-input'
                            />
                        </div>
                        <div className='login-form-label'>
                            <i className={'iconfont icon-ziyuanxhdpi'} />
                            <input
                                onChange={(value) =>
                                    bindForm(value, 'md5_password')
                                }
                                placeholder={'密码'}
                                type={'password'}
                                className='login-form-input'
                            />
                        </div>
                        <Button
                            loading={submitLoading}
                            className={'login-form-submit'}
                            onClick={login}
                            block
                            type='primary'
                        >
                            登录
                        </Button>
                    </div>
                    <QrCode />
                    <div className='login-form-other'>
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
    )
}

export default Login
