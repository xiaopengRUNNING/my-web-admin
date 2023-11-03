import type { Router } from 'vue-router';
import Nprogress from 'nprogress';
import { setRouteEmitter } from '@/utils/router-listener';
import 'nprogress/nprogress.css';
import setupPagePermissionGuard from './page-permissions';

Nprogress.configure({ showSpinner: false });

function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    document.title =
      (to.meta.title as string) || import.meta.env.VITE_APP_TITLE;

    setRouteEmitter(to);
    if (!Nprogress.isStarted()) {
      Nprogress.start();
    }

    if (from.query.redirect) {
      const redirect = decodeURIComponent(from.query.redirect as string);
      if (redirect === to.path) {
        next();
      } else {
        next({ path: redirect, replace: true });
      }
    } else {
      next();
    }
    // const redirect = decodeURIComponent(from.query.redirect as string);
    // if (to.path === redirect) {
    //   next({ ...to, replace: true });
    // } else {
    //   next({
    //     path: redirect,
    //     replace: true,
    //   });
    // }
    // next();
  });

  router.afterEach(() => {
    Nprogress.done();
  });
}

export default function createRouterGuard(router: Router) {
  setupPageGuard(router);
  setupPagePermissionGuard(router);
}
