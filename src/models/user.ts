import { Effect, ImmerReducer, Subscription } from 'umi';

export interface UserModelSatae {
    userinfo: {};
}

export interface UserModelType {
    state: UserModelSatae;
    effects: {
        query: Effect;
    };
    reducers: {
        // 启用 immer 之后
        save: ImmerReducer<UserModelSatae>;
    };
    subscriptions?: { setup: Subscription };
}

const userModel: UserModelType = {
    state: {
        userinfo: 'test',
    },
    effects: {
        *query() {},
    },
    reducers: {
        save(state, action) {
            state.userinfo = action.payload;
        },
    },
};
export default userModel;
