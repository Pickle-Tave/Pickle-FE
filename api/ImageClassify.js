import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const classifyImages = async requestBody => {
  try {
    // AsyncStorage에서 accessToken 가져오기
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // API 호출
    const response = await instance.post('/images/classify', requestBody, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log('Received response from backend:', response.data);

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(`Failed to classify images: ${response.status}`);
    }
  } catch (error) {
    console.error('Error classifying images:', error);

    if (error.response) {
      console.error('Response error:', error.response);
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    throw error;
  }
};