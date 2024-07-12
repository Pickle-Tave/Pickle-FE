import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './tokenService';

const instance = axios.create({
  baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
});

// Axios 요청 인터셉터
instance.interceptors.request.use(
  async config => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access token in request interceptor:', accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error getting access token from AsyncStorage:', error);
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
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
    console.error('Response interceptor error:', error);

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 500) &&
      !originalRequest._retryCount
    ) {
      originalRequest._retryCount = originalRequest._retryCount || 0;
      if (originalRequest._retryCount < 2) {
        originalRequest._retryCount += 1;
        console.log('Attempting to refresh token...');

        try {
          const newTokens = await refreshAccessToken();
          await AsyncStorage.setItem('accessToken', newTokens.accessToken);
          await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);

          console.log('New tokens saved to AsyncStorage');

          // 새로운 토큰을 사용하여 원래 요청 다시 시도
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return instance(originalRequest);
        } catch (e) {
          console.error('Token refresh failed:', e);
          // 토큰 갱신 실패
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
