import { RouteRecordRaw } from 'vue-router';
import appRoutes from '@/router/modules-index';
import { typeOf } from '@/utils/tools';

export function generateLocalRoutes(
  routes: RouteRecordRaw[],
): RouteRecordRaw[] {
  if (typeOf(routes) !== 'Array' || !routes.length) {
    return [];
  }
  const menu: RouteRecordRaw[] = [];

  routes.forEach((item) => {
    const menuItem = { ...item };

    if (item.children && item.children.length) {
      menuItem.children = generateLocalRoutes(item.children);

      const hasChildrenMenu = item.children.filter(
        (v) => v.meta && !v.meta.hide,
      );

      if (!hasChildrenMenu.length && menuItem.meta) {
        menuItem.meta.hide = 1;
      } else {
        menuItem.redirect = item.redirect || hasChildrenMenu[0].path;
        menu.push(menuItem);
      }
    } else if (item.meta && !item.meta.hide) {
      menu.push(menuItem);
    }
  });

  return menu;
}

export default function useMenuTree() {
  const menuTree = generateLocalRoutes(
    appRoutes.sort((a, b) => {
      return (a?.meta?.sort || 0) - (b?.meta?.sort || 0);
    }),
  );

  return { menuTree };
}
