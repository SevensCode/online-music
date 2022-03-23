import React, { useEffect } from 'react';
import { withRouter } from 'umi';
import Header from '@/layouts/components/Header';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.less';
import { useSetRecoilState } from 'recoil';
import { atom_user_info } from '@/recoil/user';
import { STORE_USER_INFO } from '@/constants';
import store from 'store';

export default withRouter(({ children, location }) => {
    const setUserinfo = useSetRecoilState(atom_user_info);
    useEffect(() => {
        setUserinfo(store.get(STORE_USER_INFO));
    }, []);
    return (
        <div className={'layout'}>
            <Header />
            <main>
                <TransitionGroup component={null}>
                    <CSSTransition
                        key={location.pathname}
                        timeout={1000}
                        classNames="page"
                    >
                        {children}
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
});
