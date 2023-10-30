import { RouteRecordRaw } from 'vue-router';

const dashboard: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/workplace',
    meta: { title: '首页', icon: 'icon-dashboard', auth: 1, hide: 0, sort: 1 },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'DashboardWorkplace',
        component: () => import('@/views/dashboard/workplace.vue'),
        meta: { title: '工作台', auth: 1, hide: 0 },
      },
      {
        path: '/dashboard/monitor',
        name: 'DashboardMonitor',
        component: () => import('@/views/dashboard/monitor.vue'),
        meta: { title: '监控台', auth: 1, hide: 0 },
      },
    ],
  },
];
export default dashboard;
