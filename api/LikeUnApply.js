import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LikeUnApply = async (albumId) => {
    try {
        console.log('좋아요 해제 albumId', albumId);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.delete(
            `/hearts/unapply/${albumId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('좋아요 해제 응답:', response.data); 
        return response.data;
    } catch (error) {
        console.error('좋아요 해제 에러:', error);

        const status = error.response.status;
        const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

        if (status === 404) {
            if (error.response.data.data.errorClassName === 'ALBUM_NOT_FOUND') {
                Alert.alert('앨범을 찾을 수 없음 ' + errorMessage);
            } else {
                Alert.alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
        } else if (status === 400) {
            if (error.response.data.data.errorClassName === 'NOT_ALBUM_OWNER') {
                Alert.alert('해당 앨범 소유주 아님 ' + errorMessage);
            } else {
                Alert.alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
        } else {
            Alert.alert('에러', '오류가 발생했습니다: ' + errorMessage);
        }
        throw error;
    }
};
