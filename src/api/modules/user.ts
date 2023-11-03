import service from '../request';

const { post, del, put, get } = service;

export interface UserData {
  username: string;
  name: string;
  password: string;
}

export function userAdd(params: Partial<UserData>): Promise<any> {
  return post('/user/add', params);
}
/**
 * 用户删除
 * @param id 用户ID
 * @param logic 是否为逻辑删除
 * @returns Promise
 */
export function userDelete(id: string, logic: boolean = false): Promise<any> {
  return logic ? del(`/user/${id}`) : del(`/user/delete/${id}`);
}
/**
 * 撤销逻辑删除
 * @param id 用户ID
 * @returns Promise
 */
export function userCancelDel(id: string): Promise<any> {
  return put(`/user/cancelDelete/${id}`);
}
export function userEdit(id: string, params: Partial<UserData>): Promise<any> {
  return put(`/user/${id}`, params);
}
export function userAll(): Promise<any> {
  return get(`/user/getAll`);
}
// 分页查询
export function userList(params: any): Promise<any> {
  return get(`/user/getList`, params);
}
export function userQuery(id: string): Promise<any> {
  return get(`/user/${id}`);
}
