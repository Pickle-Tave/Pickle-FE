import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
});

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  console.log('Refreshing token with:', refreshToken);

  try {
    const response = await instance.post('/auth/refresh', {
      refreshToken: refreshToken,
    });
    console.log('Token refreshed successfully:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error refreshing token:', error);

    throw error;
  }
};