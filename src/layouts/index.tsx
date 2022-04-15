import React, { useEffect } from 'react';
import { withRouter } from 'umi';
import Header from '@/layouts/components/Header';
import MusicPlayer from '@/layouts/components/MusicPlayer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user_info, user_likeMusicIds } from '@/recoil/user';
import { STORE_USER_INFO } from '@/constants';
import store from 'store';
import { UserRequst } from '@/api/user';
import FullScreenPlayer from '@/layouts/components/FullScreenPlayer';
import { audio_isShowFullScreenPlayer } from '@/recoil/audio';
import CommentInputBox from '@/components/Comment/CommentInputBox';

export default withRouter(({ children, location }) => {
    const setUserinfo = useSetRecoilState(user_info);
    const setLikeMusicIds = useSetRecoilState(user_likeMusicIds);
    const isShowFullScreenPlayer = useRecoilValue(audio_isShowFullScreenPlayer);
    useEffect(() => {
        const userinfo = store.get(STORE_USER_INFO);
        if (userinfo) {
            setUserinfo(userinfo);
            UserRequst.getUserLikeMusicIds(userinfo.userId).then(({ ids }) => {
                ids && setLikeMusicIds(ids);
            });
        }
    }, []);
    return (
        <div className={'layout'}>
            <Header />
            <main>
                <CommentInputBox />
                <TransitionGroup component={null}>
                    <CSSTransition
                        key={location.pathname}
                        timeout={300}
                        classNames="page"
                    >
                        {children}
                    </CSSTransition>
                </TransitionGroup>
            </main>
            <MusicPlayer />
            <CSSTransition
                unmountOnExit
                in={isShowFullScreenPlayer}
                classNames="bottomLineIn"
                timeout={300}
            >
                <FullScreenPlayer />
            </CSSTransition>
        </div>
    );
});
