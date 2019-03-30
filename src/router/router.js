import Main from '@/views/Main.vue';

// const Main = () => import('@/views/Main.vue');

// 不作为Main组件的子页面展示的页面单独写，如下
export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import(/* webpackChunkName: "404" */'@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import(/* webpackChunkName: "403" */'@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import(/* webpackChunkName: "500" */'@/views/error-page/500.vue')
};


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index_page', component: () => import(/* webpackChunkName: "home" */'@/views/home/home.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/home',
        icon: 'ios-home',
        name: 'home',
        title: '首页',
        component: Main,
        children: [
            { path: 'index', title: '首页', name: 'home_index', component: () => import(/* webpackChunkName: "home" */'@/views/home/home.vue') }
        ]
    },
    {
        path: '/qualification',
        icon: 'ios-home',
        name: 'qualification',
        title: '资质',
        component: Main,
        children: [
            { path: 'promoted', icon: 'ios-compose', title: '资质审核', name: 'qualification-promoted', component: () => import(/* webpackChunkName: "promoted" */'@/views/qualification/promoted.vue') },
            { path: 'creative', icon: 'ios-compose', title: '素材评审', name: 'qualification-creative', component: () => import(/* webpackChunkName: "creative" */'@/views/qualification/creative.vue') }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers =  [
    otherRouter,
    ...appRouter,
    page404,
    page403,
    page500
]
