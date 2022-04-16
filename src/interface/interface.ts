export interface UserInfo {
  userName: string;
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
    userName: string;
  };
  msg?: string;
  code?: number;
}
