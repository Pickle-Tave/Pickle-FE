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
        console.log('해시태그 생성 응답:', response.data); // 백엔드 응답 로그 출력
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
                Alert.alert('에러', '리소스를 찾을 수 없습니다. 경로를 확인하세요: ' + errorMessage);
            } else if (status === 409) {
                if (error.response.data.data.errorClassName === 'EXCEED_HASHTAG_NUMBER') {
                    Alert.alert('에러', '해시태그 개수를 초과했습니다: ' + errorMessage);
                } else if (error.response.data.data.errorClassName === 'HASHTAG_ALREADY_EXIST') {
                    Alert.alert('에러', '해시태그가 이미 존재합니다: ' + errorMessage);
                } else {
                    Alert.alert('에러', '충돌이 발생했습니다: ' + errorMessage);
                }
            } else {
                Alert.alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
        } else {
            Alert.alert('에러', '알 수 없는 에러가 발생했습니다.');
        }

        throw error; // 에러를 다시 던져서 상위 코드에서 처리할 수 있게 함
    }
};
