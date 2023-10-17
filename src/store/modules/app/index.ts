import { defineStore } from 'pinia';
import { AppState } from './types';

const useAppState = defineStore('app', {
  state: (): AppState => ({ systemName: 'My Web Admin', theme: 'light' }),
  actions: {
    toggleTheme(dark: string) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export default useAppState;
