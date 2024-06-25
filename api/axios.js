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
    console.log('Access token in request interceptor:', accessToken); // 로그 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error); // 로그 추가
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
    console.error('Response interceptor error:', error); // 로그 추가

    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 요청 재시도 플래그 설정

      try {
        console.log('Attempting to refresh token...'); // 로그 추가
        const newTokens = await refreshAccessToken();
        await AsyncStorage.setItem('accessToken', newTokens.accessToken);
        await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);

        // 새로운 토큰을 사용하여 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return instance(originalRequest);
      } catch (e) {
        console.error('Token refresh failed:', e); // 로그 추가
        // 토큰 갱신 실패 시 로그아웃 또는 다른 처리
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
