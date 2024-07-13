import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
  });

export const HashTagDelete = async (member_tag_id) => {
    try {
        console.log('member_tag_id:', member_tag_id);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.delete(
            `/tags/${member_tag_id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('해시태그 삭제 응답:', response.data); // 백엔드 응답 로그 출력
        return response.data;
    } catch (error) {
        console.error('해시태그 삭제 에러:', error);
        throw error; 
    }
};
