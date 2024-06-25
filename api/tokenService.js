import instance from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
