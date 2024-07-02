import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPresignedUrls = async count => {
  try {
    // AsyncStorage에서 accessToken 가져오기
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Presigned URL 요청
    const response = await instance.post(
      '/images/upload-url',
      {imageUploadSize: count},
      {headers: {Authorization: `Bearer ${accessToken}`}},
    );

    console.log('Received response from backend:', response.data);

    if (response.status !== 200) {
      throw new Error(`Failed to get presigned URLs: ${response.status}`);
    }

    const presignedUrls = response.data.data.presignedUrls; // Presigned URLs 배열
    if (!presignedUrls || presignedUrls.length === 0) {
      throw new Error('No presigned URLs received');
    }

    return presignedUrls; // Presigned URLs 배열 반환
  } catch (error) {
    console.error('Error fetching presigned URLs:', error);
    throw error;
  }
};
