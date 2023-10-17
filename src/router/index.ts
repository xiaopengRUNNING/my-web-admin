import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './modules-index';
import createRouterGuard from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/components/layout/GlobalLayout.vue'),
      redirect: 'home',
      meta: {
        // router other information
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {},
          children: [],
        },
      ],
    },
    ...appRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'noFound',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouterGuard(router);

export default router;
