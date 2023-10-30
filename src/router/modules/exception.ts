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
      sort: 3,
    },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import('@/views/exception/403.vue'),
        meta: { title: '403', auth: 1, hide: 0 },
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import('@/views/exception/404.vue'),
        meta: { title: '404', auth: 1, hide: 0 },
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import('@/views/exception/500.vue'),
        meta: { title: '500', auth: 1, hide: 0 },
      },
    ],
  },
];

export default exception;
