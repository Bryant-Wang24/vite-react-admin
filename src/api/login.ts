import { request } from './request';
import { UserInfo } from '@/interface/interface';

export async function login(data: UserInfo) {
  return request({
    url: '/admin/login',
    method: 'post',
    data,
  });
}

export async function logout() {
  return request({
    url: '/admin/logout',
    method: 'post',
  });
}
