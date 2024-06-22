// 인증코드 받아서 토큰 요청

import instance from './axios';

export const loginKakao = async code => {
  try {
    console.log('Sending code to backend:', code);
    const response = await instance.post(
      '/auth/login',
      {code: code}, // 링크에서 빼낸 카카오 인증 코드
    );
    console.log('Received response from backend:', response.data); // 백엔드 응답 로그 출력
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    throw error;
  }
};
