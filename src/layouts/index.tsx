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
import LyricsView from '@/layouts/components/LyricsView';
import { audio_isLyricsView, audio_musicDetails } from '@/recoil/audio';

export default withRouter(({ children, location }) => {
    const setUserinfo = useSetRecoilState(user_info);
    const musicDetails = useRecoilValue(audio_musicDetails);
    const setLikeMusicIds = useSetRecoilState(user_likeMusicIds);
    const isLyricsView = useRecoilValue(audio_isLyricsView);
    useEffect(() => {
        const userinfo = store.get(STORE_USER_INFO);
        if (userinfo) {
            setUserinfo(userinfo);
            UserRequst.getUserLikeMuiscIds(userinfo.userId).then(({ ids }) => {
                ids && setLikeMusicIds(ids);
            });
        }
    }, []);

    return (
        <div className={'layout'}>
            <Header />
            <main>
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
                in={isLyricsView}
                classNames="bottomLineIn"
                timeout={400}
            >
                <LyricsView />
            </CSSTransition>
        </div>
    );
});
