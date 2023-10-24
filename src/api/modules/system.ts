import service from '../request';

const { post } = service;

export interface LoginData {
  username: string;
  password: string;
}

export function login(params: LoginData): Promise<any> {
  return post('/system/login', params);
}
