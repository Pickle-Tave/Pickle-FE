import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ImageDelete = async (imageIds) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.delete(
            '/images/delete-image',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: {
                    imageIds: imageIds
                }
            }
        );
        
        console.log('이미지 삭제 응답:', response.data); 
        return response.data;
    } catch (error) {
        // 예외 처리하기
        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';
   
            if (status === 404) {
                //이미지가 존재하지 않는 경우
                if (error.response.data.data.errorClassName === 'IMAGE_NOT_FOUND') {
                    alert(errorMessage);
                }
            } else if (status === 400) {
                //해당 이미지의 소유자가 아닌 경우(본인이 업로드 한 사진이 아닌 경우)
                if (error.response.data.data.errorClassName === 'NOT_IMAGE_OWNER') {
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
