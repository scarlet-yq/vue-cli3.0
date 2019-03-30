import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    routes: routers
};

export const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
})


router.afterEach((to, from) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
})


