import instance from './axios'; // './axios'에서 instance를 가져옴
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  console.log('Refreshing token with:', refreshToken);
  try {
    // 요청을 보낼 때 헤더에 엑세스 토큰을 설정하지 않음
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
