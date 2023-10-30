import { RouteRecordRaw } from 'vue-router';

const system: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'icon-apps',
      auth: 1,
      hide: 0,
      sort: 2,
    },
    redirect: '/system/user',
    children: [
      {
        path: '/system/user',
        name: 'SystemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          auth: 1,
          hide: 0,
        },
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          auth: 1,
          hide: 0,
        },
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          auth: 1,
          hide: 0,
        },
      },
    ],
  },
];

export default system;
