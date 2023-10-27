import 'vue-router';

import {ZeroOrOne} from '@/types/global';

export {};

// 扩展定义 route 中的 meta 类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    auth?: ZeroOrOne;
    hide?: ZeroOrOne;
  }
}