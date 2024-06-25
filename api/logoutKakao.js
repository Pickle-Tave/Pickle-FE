import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const logoutKakao = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      Alert.alert('로그인 상태가 아닙니다.');
      return;
    }

    const response = await instance.post('/members/logout', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Received response from backend:', response.data);

    if (response.data && response.data.success) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      Alert.alert('로그아웃 되었습니다.');
    } else {
      throw new Error('로그아웃 실패');
    }
  } catch (error) {
    console.error('Logout Error:', error);
    Alert.alert(
      '로그아웃 실패',
      error.message || '서버와 통신하는 중 오류가 발생했습니다.',
    );
  }
};
