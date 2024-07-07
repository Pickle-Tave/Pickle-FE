import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ImageAddAlbum = async (albumId, imageUrls) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            '/images/add-album',
            { 
                albumId: albumId,
                imageUrls: imageUrls,
             },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('이미지 추가 응답:', response.data); // 백엔드 응답 로그 출력
        return response.data;
    } catch (error) {
        // 예외 처리하기
        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';
   
            if (status === 404) {
                //존재하지 않는 앨범에 저장을 시도한 경우
                if (error.response.data.data.errorClassName === 'ALBUM_NOT_FOUND') {
                    alert(errorMessage);
                }
            } else if (status === 400) {
                //해당 앨범의 소유자가 아닌 경우
                if (error.response.data.data.errorClassName === 'NOT_ALBUM_OWNER') {
                    alert(errorMessage);
                } else {
                    alert('에러', '충돌이 발생했습니다: ' + errorMessage);
                }
            } else {
                alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
        } else {
            alert('에러', '알 수 없는 에러가 발생했습니다.');
        }

        throw error; 
    }
};
