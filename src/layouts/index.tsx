import React, { useEffect } from 'react'
import { withRouter } from 'umi'
import Header from '@/layouts/components/Header'
import MusicPlayer from '@/layouts/components/MusicPlayer'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.less'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { user_basicInfo, user_likeMusicIds } from '@/recoil/user'
import { UserRequst } from '@/server/api/user'
import FullScreenPlayer from '@/layouts/components/FullScreenPlayer'
import { setting_fullScreenPlayerVisible } from '@/recoil/setting'
import { UserBasicInfo } from '@/types/user'
import BackTop from '@/components/BackTop'
import { STORE_USER_INFO } from '@/constants'
import store from 'store'

const getLoginStatus = async (): Promise<null | UserBasicInfo> => {
    const data = await UserRequst.getLoginStatus()
    if (data?.data?.code !== 200) return null
    return data?.data?.profile
}

export default withRouter(({ children, location }: any) => {
    const setUserinfo = useSetRecoilState(user_basicInfo)
    const setLikeMusicIds = useSetRecoilState(user_likeMusicIds)
    const isShowFullScreenPlayer = useRecoilValue(setting_fullScreenPlayerVisible)
    useEffect(() => {
        getLoginStatus().then(userinfo => {
            if (userinfo === null) return
            setUserinfo(userinfo)
            store.set(STORE_USER_INFO, userinfo)
            UserRequst.getUserLikeMusicIds(userinfo.userId).then(({ ids }) => {
                ids && setLikeMusicIds(ids)
            })
        })
    }, [])

    return (
        <div className={'layout'}>
            <Header />
            <main>
                <TransitionGroup component={null}>
                    <CSSTransition key={location.pathname} timeout={300} classNames='page'>
                        {children}
                    </CSSTransition>
                </TransitionGroup>
            </main>
            <MusicPlayer />
            <CSSTransition unmountOnExit in={isShowFullScreenPlayer} classNames='rightZoomFade' timeout={300}>
                <FullScreenPlayer />
            </CSSTransition>
            <BackTop target={() => document.querySelector('.layout') as HTMLDivElement} />
        </div>
    )
})
