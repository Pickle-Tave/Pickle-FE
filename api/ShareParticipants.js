import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShareParticipants = async (albumLink, albumPassword) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            `/albums/share/participants`,
            {
                albumLink: albumLink,
                albumPassword: albumPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('공유 앨범 참여 응답:', response.data);

        return response.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

            if (status === 400) {
                // 앨범의 링크에 대하여 앨범이 존재하지 않을때 
                if (error.response.data.data.errorClassName === 'SHARED_ALBUM_NOT_FOUND') {
                    alert(errorMessage);
                } // 앨범 링크에 대하여 비밀번호가 일치하지 않는 경우
                else if (error.response.data.data.errorClassName === 'SHARED_ALBUM_PASSWORD_MISMATCH') {
                    alert(errorMessage);
                } // 이미 공유앨범에 참여한 경우
                else if (error.response.data.data.errorClassName === 'MEMBER_ALREADY_JOINED') {
                    alert(errorMessage);
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
