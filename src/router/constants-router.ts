import { RouteRecordRaw } from 'vue-router';

const constantsRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403.vue'),
    meta: {
      title: '403',
      auth: 0,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue'),
    meta: {
      title: '404',
      auth: 0,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue'),
    meta: {
      title: '500',
      auth: 0,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      auth: 0,
    },
  },
];

export default constantsRoutes;
