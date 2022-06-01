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

// 获取标签
export async function fetchTags() {
  return request({
    url: '/tags'
  });
}

// 添加标签
export async function addTag(params){
  return request({
    url:'/tags',
    method:'post'
  })
}