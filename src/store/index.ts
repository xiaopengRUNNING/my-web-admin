import { createPinia } from 'pinia';
import useAppState from './modules/app';
import useUserState from './modules/user';

const pinia = createPinia();

export { useAppState, useUserState };
export default pinia;
