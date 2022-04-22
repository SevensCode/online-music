import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    LoadingOutlined,
    RollbackOutlined,
    WarningOutlined
} from '@ant-design/icons'
import { message, Tooltip } from 'antd'
import { useSearchParam, useStatus } from '@/hooks'
import { UserRequst } from '@/server/api/user'
import { history } from '@@/core/history'
import { useSetRecoilState } from 'recoil'
import { user_info } from '@/recoil/user'
import store from 'store'
import { STORE_USER_INFO } from '@/constants'
// 生成二维码key
const generateQRCodeKey = async () => {
    const { code, data } = await UserRequst.generateQRCodeKey()
    if (code !== 200) return false
    return data.unikey
}
const QrCode = () => {
    const setUserinfo = useSetRecoilState(user_info)
    const redirect = useSearchParam('redirect')
    const qrCodeRef = useRef<HTMLDivElement>(null)
    const [qrCodeVisible, setQrCodeVisible] = useState(false)
    const [statusMessage, setStatusMessage] = useState<string>()
    const [qrCodeUrl, setQrCodeUrl] = useState<string>()
    const timer = useRef<NodeJS.Timer | null>(null)
    // 关闭定时器
    const offTimer = useCallback(() => {
        clearInterval(timer.current as NodeJS.Timeout)
        timer.current = null
    }, [])
    // 二维码状态
    const [qrCodeStatus, loading, success, error] = useStatus()

    // 生成二维码
    const generateQRCode = useCallback(async () => {
        // 生成二维码之前先把之前的定时器关闭
        offTimer()
        loading()
        // 生成二维码key
        const key = await generateQRCodeKey()
        if (!key) return error()
        const { code, data } = await UserRequst.generateQRCode({
            key,
            qrimg: true
        })
        if (code !== 200) return error()
        success()
        setQrCodeUrl(data.qrimg)
        setStatusMessage('等待扫码！')
        timer.current = setInterval(async () => {
            const { code: qrCodeStatus } = await UserRequst.detectQRCodeStatus(
                key
            )
            switch (qrCodeStatus) {
                // 二维码已过期
                case 800:
                    setStatusMessage('二维码已过期,点击二维码可重新加载！')
                    offTimer()
                    break
                // 等待扫码
                case 801:
                    setStatusMessage('等待扫码！')
                    break
                // 授权中
                case 802:
                    setStatusMessage('授权中！')
                    break
                // 授权成功
                case 803:
                    // 获取用户状态
                    const {
                        data: { code, profile }
                    } = await UserRequst.getLoginStatus()
                    if (code !== 200) return message.error('服务端的错误！')
                    offTimer()
                    message.success('登录成功 😊')
                    setUserinfo(profile)
                    store.set(STORE_USER_INFO, profile)
                    history.replace(redirect || '/')
                    break
                default:
                    message.error('系统错误')
            }
        }, 3000)
    }, [])
    // 控制二维码弹框显示隐藏
    const handleQrCode = useCallback(
        (isShow: boolean) => {
            const { current } = qrCodeRef
            if (isShow) {
                !qrCodeUrl && generateQRCode()
                current?.classList.add('visible')
                current?.classList.remove('hidden')
            } else {
                current?.classList.add('hidden')
                current?.classList.remove('visible')
            }
            setQrCodeVisible(isShow)
        },
        [qrCodeVisible, qrCodeUrl]
    )
    //  页面关闭时 清除定时器
    useEffect(() => () => offTimer(), [])
    return (
        <div ref={qrCodeRef} className={'login-qrCode gaussianBlur'}>
            {qrCodeVisible && (
                <>
                    <RollbackOutlined
                        onClick={() => handleQrCode(false)}
                        className={'login-qrCode-close'}
                    />
                    {qrCodeStatus.loading && (
                        <>
                            <LoadingOutlined className='login-qrCode-loading' />
                            <span className='login-qrCode-loadingText'>
                                加载中...
                            </span>
                        </>
                    )}
                    {qrCodeStatus.error && (
                        <>
                            <WarningOutlined
                                onClick={generateQRCode}
                                className='login-qrCode-loading error'
                            />
                            <span
                                onClick={generateQRCode}
                                className='login-qrCode-loadingText'
                            >
                                加载失败,点击重新加载
                            </span>
                        </>
                    )}
                    {qrCodeStatus.success && (
                        <>
                            <p className='login-qrCode-status'>
                                {statusMessage}
                            </p>
                            <Tooltip title={'点击重新生成二维码'}>
                                <img
                                    className='login-qrCode-img'
                                    onClick={generateQRCode}
                                    src={qrCodeUrl}
                                    alt=''
                                />
                            </Tooltip>
                        </>
                    )}

                    <h3 className='login-qrCode-prompt'>
                        使用网易云App进行扫码登录
                    </h3>
                </>
            )}
            {!qrCodeVisible && (
                <i
                    onClick={() => handleQrCode(true)}
                    className={'iconfont icon-erweima login-qrCode-icon'}
                />
            )}
        </div>
    )
}

export default QrCode
