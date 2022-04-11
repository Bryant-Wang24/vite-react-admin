import axios from 'axios';

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
      return response.data ? response.data : response;
    },
    (error) => {
      console.log(error);
    }
  );

  return http(config);
};
