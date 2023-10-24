import { defineStore } from 'pinia';
import { Message } from '@arco-design/web-vue';
import { login, LoginData } from '@/api/modules/system';
import { UserState } from './types';
import { setToken, clearToken } from '@/utils/token';

const useUserStore = defineStore('user', {
  state: (): Partial<UserState> => ({}),
  getters: {
    userInfo: (state) => ({ ...state }),
  },
  actions: {
    resetInfo(): void {
      this.$reset();
    },
    setInfo(partial: Partial<UserState>): void {
      this.$patch(partial);
    },
    async userLogin(params: LoginData): Promise<any> {
      const { success, result, message } = await login(params);
      if (success) {
        Message.success('欢迎回来！');
        const { token, userInfo } = result;
        this.setInfo(userInfo);
        setToken(token);
      } else {
        Message.error(message);
      }
    },
    userLogout(): void {
      clearToken();
    },
  },
});

export default useUserStore;
