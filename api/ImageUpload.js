import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPresignedUrl = async () => {
  try {
    // AsyncStorage에서 accessToken 가져오기
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Presigned URL 요청
    const response = await instance.post(
      '/images/upload-url',
      {imageUploadSize: 2},
      {headers: {Authorization: `Bearer ${accessToken}`}},
    );

    console.log('Received response from backend:', response.data);

    if (response.status !== 200) {
      throw new Error(`Failed to get presigned URL: ${response.status}`);
    }

    const presignedUrls = response.data.data.presignedUrls; // 배열로 받는지 확인
    if (!presignedUrls || presignedUrls.length === 0) {
      throw new Error('No presigned URLs received');
    }

    return presignedUrls[0]; // 첫 번째 URL 반환
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};
