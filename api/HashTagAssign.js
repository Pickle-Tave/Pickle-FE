import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const assignHashTag = async requestBody => {
  try {
    // AsyncStorage에서 accessToken 가져오기
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await instance.post('/images/assign/tag', requestBody, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log('Received response from backend:', response.data);

    if (response.status === 200) {
      return response.data.data;
    } else if (response.status === 404) {
      if (
        response.data &&
        response.data.data.errorClassName === 'TAG_NOT_FOUND'
      ) {
        console.error(
          '해시태그가 존재하지 않습니다.',
          response.data.data.message,
        );
        throw new Error(response.data.data.message);
      } else {
        throw new Error(`Resource not found: ${response.status}`);
      }
    } else {
      throw new Error(`Failed to assign hashtag: ${response.status}`);
    }
  } catch (error) {
    console.error('Error assigning hashtag:', error);

    if (error.response) {
      console.error('Response error:', error.response);
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};
