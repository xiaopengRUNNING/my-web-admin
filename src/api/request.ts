import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { Modal, Message } from '@arco-design/web-vue';
import { ModalReturn } from '@arco-design/web-vue/es/modal/interface';
import { useUserState } from '@/store';
import { getToken } from '@/utils/token';
import { ResponseErrorData } from '@/types/global';

let modalReturn: ModalReturn;

const BASE_URL_PREFIX = import.meta.env.VITE_API_BASEURL;

const axiosInstance = axios.create({
  baseURL: BASE_URL_PREFIX,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const configOption: InternalAxiosRequestConfig = config;
    const token = getToken();
    if (token) {
      configOption.headers.Authorization = token;
    }
    if (config.method === 'get') {
      configOption.params = {
        _t: Date.now(),
        ...config.params,
      };
    }
    return configOption;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError<ResponseErrorData>) => {
    switch (error.response?.status) {
      case 401:
        if (!modalReturn) {
          modalReturn = Modal.error({
            title: '禁止访问',
            content: '用户未登录或登录状态已过期!',
            okText: '返回登录',
            alignCenter: false,
            modalStyle: {
              textAlign: 'center',
              padding: '20px 24px',
              borderRadius: '12px',
            },
            escToClose: false,
            maskClosable: false,
            hideCancel: true,
            onOk: () => {
              const userState = useUserState();
              userState.userLogout().then(() => {
                window.location.reload();
              });
            },
          });
        }
        break;
      case 500:
        Message.error(error.response.data?.message);
        break;
      default:
        console.log('default');
        break;
    }
  },
);

export default {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data });
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data);
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data);
  },

  del<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data);
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
