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
