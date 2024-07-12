import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './tokenService';
import { BASE_URL } from '@env';

const instance = axios.create({
  baseURL: BASE_URL, // API 서버 주소
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
      (error.response.status === 500 || error.response.status === 401) &&
      (!originalRequest._retry ||
        (error.response.data &&
          error.response.data.errorClassName === 'AUTH_NOT_FOUND'))
    ) {
      originalRequest._retry = true; // 요청 재시도 플래그 설정

      try {
        console.log('Attempting to refresh token...');
        const newTokens = await refreshAccessToken();
        await AsyncStorage.setItem('accessToken', newTokens.accessToken);
        await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);

        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log('refreshToken in request interceptor:', refreshToken);
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
    return Promise.reject(error);
  },
);

export default instance;