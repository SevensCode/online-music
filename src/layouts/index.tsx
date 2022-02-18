import React from 'react';
import { withRouter } from 'umi';
import Header from '@/layouts/components/Header';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.less';

export default withRouter(({ children, location }) => {
    return (
        <div className={ 'layout' }>
            <Header />
            <main>
                <TransitionGroup component={ null }>
                    <CSSTransition key={ location.pathname } timeout={ 300 } classNames="page">
                        { children }
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
});

