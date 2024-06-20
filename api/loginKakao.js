import instance from './axios';

export const loginKakao = async code => {
  try {
    const response = await instance.post(
      '/login/kakao',
      {
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    throw error;
  }
};
