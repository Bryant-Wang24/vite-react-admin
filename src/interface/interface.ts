export interface UserInfo {
  username: string;
  password: string;
}

export interface LogoutMessage {
  code?: number;
  data: unknown;
  msg?: string;
}
export interface LoginResParams {
  data: {
    token: string;
    username: string;
  };
  msg?: string;
  code?: number;
}

// 标签列表参数
export interface TagListProps {
  articleNum: number
  createTime: string
  name: string
  status: boolean
  updateTime: string
  _id: string
}
