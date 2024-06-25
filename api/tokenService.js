import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  console.log('Refreshing token with:', refreshToken); // 로그 추가

  // 새로운 Axios 인스턴스 생성
  const refreshInstance = axios.create({
    baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
  });

  try {
    // 요청을 보낼 때 헤더에 엑세스 토큰을 설정하지 않음
    const response = await refreshInstance.post('/auth/refresh', {
      refreshToken: refreshToken,
    });
    console.log('Token refreshed successfully:', response.data.data); // 로그 추가
    return response.data.data;
  } catch (error) {
    console.error('Error refreshing token:', error); // 로그 추가
    throw error;
  }
};
