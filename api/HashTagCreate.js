import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HashTagCreate = async (tag_name) => {
    try {
        console.log('tag:', tag_name);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            '/tags/create',
            { name: tag_name },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('해시태그 생성 응답:', response.data); 
        return response.data;
    } catch (error) {
        // 예외 처리하기
        if (error.response) {
            console.log(error.response.data.data)
            const status = error.response.status;
            console.log(status);

            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';
            console.log(errorMessage);
    

            if (status === 404) {
                alert('에러', '리소스를 찾을 수 없습니다. 경로를 확인하세요: ' + errorMessage);
            } else if (status === 409) {
                if (error.response.data.data.errorClassName === 'EXCEED_HASHTAG_NUMBER') {
                    alert(errorMessage);
                } else if (error.response.data.data.errorClassName === 'HASHTAG_ALREADY_EXIST') {
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
