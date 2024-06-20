import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://pickle-alb-479970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
});

export default instance;
