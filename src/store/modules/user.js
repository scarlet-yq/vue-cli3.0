import {accountResource} from '../../api';
import * as types from '../types';

// state
const state = {
    userInfo: {}
};

// getters
const getters = {
    userInfo: state => state.userInfo
};

// actions
const actions = {
    [types.DO_GET_USER_INFO] ({ commit, state }) {
        return accountResource.getAccount().then(response => {
            commit(types.SET_USER_INFO, response.data);
            return response.data;
        });
    }
};

// mutations
const mutations = {
    [types.SET_USER_INFO] (state, userInfo) {
        state.userInfo = userInfo;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
