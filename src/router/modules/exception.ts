import { RouteRecordRaw } from 'vue-router';

const exception: RouteRecordRaw[] = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    meta: {
      title: '异常页',
      icon: 'icon-exclamation-circle',
      auth: 1,
      hide: 0,
    },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import('@/views/exception/403.vue'),
        meta: { title: '工作台', auth: 1, hide: 0 },
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import('@/views/exception/404.vue'),
        meta: { title: '监控台', auth: 1, hide: 0 },
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import('@/views/exception/500.vue'),
        meta: { title: '监控台', auth: 1, hide: 0 },
      },
    ],
  },
];

export default exception;
