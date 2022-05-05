import React, { useEffect } from 'react'
import { withRouter } from 'umi'
import Header from '@/layouts/components/Header'
import MusicPlayer from '@/layouts/components/MusicPlayer'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.less'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { user_info, user_likeMusicIds } from '@/recoil/user'
import { UserRequst } from '@/server/api/user'
import FullScreenPlayer from '@/layouts/components/FullScreenPlayer'
import { setting_fullScreenPlayerVisible } from '@/recoil/setting'
import { Userinfo } from '@/types/user'

const getLoginStatus = async (): Promise<null | Userinfo> => {
    const {
        data: { code, profile }
    } = await UserRequst.getLoginStatus()
    if (code !== 200) return null
    return profile
}

export default withRouter(({ children, location }) => {
    const setUserinfo = useSetRecoilState(user_info)
    const setLikeMusicIds = useSetRecoilState(user_likeMusicIds)
    const isShowFullScreenPlayer = useRecoilValue(setting_fullScreenPlayerVisible)
    useEffect(() => {
        getLoginStatus().then(userinfo => {
            if (userinfo === null) return
            setUserinfo(userinfo)
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
        </div>
    )
})
