import axios from './axios';

const instance = axios.create({
  baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
});

export const loginKakao = async code => {
  try {
    console.log('Sending code to backend:', code);

    const response = await instance.post('/auth/login', {code: code});

    console.log('Received response from backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    throw error;
  }
};
