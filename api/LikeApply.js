import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LikeApply = async (albumId) => {
    try {
        console.log('좋아요 설정 albumId', albumId);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            `/hearts/apply/${albumId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('좋아요 설정 응답:', response.data); // 백엔드 응답 로그 출력
        return response.data;
    } catch (error) {
        console.error('좋아요 설정 에러:', error);
        const status = error.response.status;
        const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

        if (status === 404) {
            if (error.response.data.data.errorClassName === 'ALBUM_NOT_FOUND') {
                alert('앨범을 찾을 수 없음 ' + errorMessage);
            } else {
                alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
        } else if (status === 400) {
            if (error.response.data.data.errorClassName === 'NOT_ALBUM_OWNER') {
                alert('해당 앨범 소유주 아님 ' + errorMessage);
            } else {
                alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
        } else {
            alert('에러', '오류가 발생했습니다: ' + errorMessage);
        }
        throw error;
    }
};
