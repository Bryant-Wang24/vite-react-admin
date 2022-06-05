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

interface FetchTagProps {
  page: number;
  pageSize: number;
}
// 获取标签
export async function fetchTags(params?: FetchTagProps) {
  return request({
    url: '/tags',
    params,
  });
}
interface AddTagProps {
  name: string;
}
// 添加标签
export async function addTag(params: AddTagProps) {
  return request({
    url: '/tags',
    method: 'post',
    data: params,
  });
}
interface UpdateTagProps {
  id: string;
  name: string;
}
// 修改标签
export async function updateTag(params: UpdateTagProps) {
  return request({
    url: `/tags/${params.id}`,
    method: 'put',
    data: { name: params.name },
  });
}

interface DeleteTagProps {
  id: string;
}
// 删除标签
export async function deleteTag(id: DeleteTagProps) {
  return request({
    url: `/tags/${id}`,
    method: 'delete',
  });
}
