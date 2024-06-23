import instance from './axios';

export const loginKakao = async (code) => {
  try {
    console.log('Sending code to backend:', code);
    const response = await instance.post('/auth/login', { code });
    console.log('Received response from backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    throw error;
  }
};
