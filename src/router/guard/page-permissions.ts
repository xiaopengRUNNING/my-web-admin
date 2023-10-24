import type { LocationQueryRaw, Router } from 'vue-router';
import { isLogin } from '@/utils/token';

export default function setupPagePermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (isLogin()) {
      if (to.name === 'Login') {
        next({ name: from.name || 'Home' });
        return;
      }
      next();
    } else {
      if (to.name === 'Login') {
        next();
        return;
      }
      next({
        path: '/login',
        query: { redirect: to.fullPath, ...to.query } as LocationQueryRaw,
      });
    }
  });
}
