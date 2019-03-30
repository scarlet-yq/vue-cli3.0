import * as types from '../types';
import {otherRouter, appRouter} from '../../router/router';

const state = {
    openedSubmenuArr: [], // 要展开的菜单数组
    currentPath: [   // 当前面包屑数组
        {
            title: '首页',
            path: '',
            name: 'home_index'
        }
    ],
    routers: [
        otherRouter,
        ...appRouter
    ]
};

const getters = {
    openedSubmenuArr: state => state.openedSubmenuArr,
    currentPath: state => state.currentPath,
    routers: state => state.routers
};


const mutations = {
    addOpenSubmenu (state, name) {
        let hasThisName = false;
        let isEmpty = false;
        if (name.length === 0) {
            isEmpty = true;
        }
        if (state.openedSubmenuArr.indexOf(name) > -1) {
            hasThisName = true;
        }
        if (!hasThisName && !isEmpty) {
            state.openedSubmenuArr.push(name);
        }
    },
    setCurrentPath (state, pathArr) {
        state.currentPath = pathArr;
    },
    clearOpenedSubmenu (state) {
        state.openedSubmenuArr.length = 0;
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
}
