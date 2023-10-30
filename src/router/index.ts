import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './modules-index';
import constantsRouter from './constants-router';
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
      children: [...appRoutes],
    },
    ...constantsRouter,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
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
