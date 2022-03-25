import React, { useEffect } from 'react';
import { withRouter } from 'umi';
import Header from '@/layouts/components/Header';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.less';
import { useSetRecoilState } from 'recoil';
import { atom_user_info, atom_user_likeMusicIds } from '@/recoil/user';
import { STORE_USER_INFO } from '@/constants';
import store from 'store';
import { UserRequst } from '@/api/user';

export default withRouter(({ children, location }) => {
    const setUserinfo = useSetRecoilState(atom_user_info);
    const setLikeMusicIds = useSetRecoilState(atom_user_likeMusicIds);
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
        </div>
    );
});
