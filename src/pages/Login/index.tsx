import React, { useRef, useState } from 'react'
import './index.less'
import { Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import store from 'store'
import { STORE_THEME_KEY, STORE_THEME_LIGHT } from '@/constants'
import { switchTheme } from '@/theme'
import { history, Link } from 'umi'

const Login = () => {
    const qrCodeRef = useRef<HTMLDivElement>(null)
    // 主题类型
    const [themeType, setThemeType] = useState(store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT)
    // 二维码是否可见
    const [qrCodeVisible, handleQrCodeVisible] = useState(false)
    const hanldeQrCode = (isShow: boolean) => {
        if (isShow) {
            qrCodeRef.current?.classList.add('visible')
            qrCodeRef.current?.classList.remove('hiddend')
        } else {
            qrCodeRef.current?.classList.add('hiddend')
            qrCodeRef.current?.classList.remove('visible')
        }
        handleQrCodeVisible(isShow)
    }
    const setTheme = () => {
        switchTheme()
        setThemeType(store.get(STORE_THEME_KEY) === STORE_THEME_LIGHT)
    }
    return (
        <div className={ 'login-container' }>
            <div className="login-card gaussianBlur">
                <h1 className={ 'login-header' }>
                    <span className={ 'login-line' }/>
                    <span className={ 'login-title' }>Online Music</span>
                    <span className={ 'login-line' }/>
                </h1>
                <main className={ 'login-main' }>
                    <div className="login-form">
                        <div className="login-form-albel">
                            <i className={ 'iconfont icon-shoujihao' }/>
                            <input placeholder={ '手机号' } className="login-form-input"/>
                        </div>
                        <div className="login-form-albel">
                            <i className={ 'iconfont icon-ziyuanxhdpi' }/>
                            <input placeholder={ '密码' } className="login-form-input"/>
                        </div>
                        <Button className={ 'login-form-submit' } block type="primary">登录</Button>
                    </div>
                    <div ref={ qrCodeRef } className={ 'login-qrCode gaussianBlur' }>
                        {
                            qrCodeVisible &&
                            <RollbackOutlined onClick={ () => hanldeQrCode(false) }
                                              className={ 'login-qrCode-close' }/>
                        }
                        {
                            !qrCodeVisible &&
                            <i onClick={ () => hanldeQrCode(true) }
                               className={ 'iconfont icon-erweima login-qrCode-icon' }/>
                        }
                    </div>

                    <div className="login-form-orther">
                        {
                            themeType ?
                                <i onClick={ setTheme } className={ 'iconfont icon-yueliang login-theme-icon' }/> :
                                <i onClick={ setTheme }
                                   className={ 'iconfont icon-icon-test login-theme-icon' }/>
                        }
                        <i onClick={ history.goBack } className={ 'iconfont icon-rollback' }/>
                        <Link to={ '/' }><i className={ 'iconfont icon-zhuye' }/></Link>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login