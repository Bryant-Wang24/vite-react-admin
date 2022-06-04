import axios from 'axios';
import { Message } from '@arco-design/web-react';

export const request = (config) => {
  const http = axios.create({
    baseURL: '/api/v1',
    // timeout: 5000,
  });

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  // 响应拦截
  http.interceptors.response.use(
    (response) => {
      if (response.data.code === -1) {
        Message.warning(response.data.msg);
      } else if (response.data.code === 0) {
        if (response.data.msg === 'success')
          return response.data ? response.data : response;
        Message.success(response.data.msg);
      }
      return response.data ? response.data : response;
    },
    (error) => {
      Message.error(error);
    }
  );
  return http(config);
};
