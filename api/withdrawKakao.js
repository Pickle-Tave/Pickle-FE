import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const withdrawKakao = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      Alert.alert('로그인 상태가 아닙니다.');
      return;
    }

    const response = await instance.delete('/members/withdrawal', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Received response from backend:', response.data);

    if (response.data && response.data.success) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      Alert.alert('회원 탈퇴 되었습니다.');
    } else {
      throw new Error('회원 탈퇴 실패');
    }
  } catch (error) {
    console.error('Withdraw Error:', error);
    Alert.alert(
      '회원 탈퇴 실패',
      error.message || '서버와 통신하는 중 오류가 발생했습니다.',
    );
  }
};
