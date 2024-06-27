import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HashTagDelete = async (member_tag_id) => {
    try {
        console.log('member_tag_id:', member_tag_id);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.delete(
            `/tags/${member_tag_id}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('해시태그 삭제 응답:', response.data); // 백엔드 응답 로그 출력
        return response.data;
    } catch (error) {
        console.error('앨범 삭제 에러:', error);
        throw error; // 에러를 다시 던져서 상위 코드에서 처리할 수 있게 함
    }
};
