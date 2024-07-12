import axios from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const instance = axios.create({
  baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
});

export const AlbumSave = async requestBody => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await instance.post('/images/save-album', requestBody, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log('Received response from backend:', response.data);

    if (response && response.data && response.data.success) {
      return response.data;
    } else {
      throw new Error('예상치 못한 응답 구조');
    }
  } catch (error) {
    if (error.response) {
      const {status, data} = error.response;
      if (status === 404 && data.errorClassName === 'ALBUM_NOT_FOUND') {
        Alert.alert('앨범을 찾을 수 없습니다', '해당 앨범을 찾을 수 없습니다');
      } else if (status === 400 && data.errorClassName === 'NOT_ALBUM_OWNER') {
        Alert.alert('권한 없음', '해당 앨범의 소유자가 아닙니다.');
      }
    } else {
      Alert.alert('Error', ` ${error.message || '알 수 없는 오류'}`);
    }
    throw error;
  }
};
