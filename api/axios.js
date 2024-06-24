import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshAccessToken} from './tokenService';

const instance = axios.create({
  baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
});

// Axios 요청 인터셉터

instance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Axios 응답 인터셉터

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 토큰 만료로 인해 401 에러가 발생한 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshAccessToken();
        await AsyncStorage.setItem('accessToken', newTokens.accessToken);
        await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);

        // 새로운 토큰을 사용하여 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        // 토큰 갱신 실패 시 로그아웃
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
