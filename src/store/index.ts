import { createPinia } from 'pinia';
import useAppState from './modules/app';
import useUserStore from './modules/user';

const pinia = createPinia();

export { useAppState, useUserStore };
export default pinia;
