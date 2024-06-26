import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetProfile = async () => {
    try {
   
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.get(
            '/members/mypage',
            null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('회원 정보 응답:', response.data); // 백엔드 응답 로그 출력
        return response.data;
    } catch (error) {
        console.error('회원 정보 에러:', error);
        throw error; // 에러를 다시 던져서 상위 코드에서 처리할 수 있게 함
    }
};
