// 토큰 재발급 API 함수

import instance from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const response = await instance.post('/auth/refresh', {
    refreshToken: refreshToken,
  });
  return response.data.data;
};
