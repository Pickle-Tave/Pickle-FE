import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShareAlbumChange = async (albumId, albumPassword) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            `/albums/share/${albumId}`,
            { albumPassword: albumPassword },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('공유 앨범 전환 응답:', response.data);
        console.log("공유앨범 링크", response.data.data.link);
        return response.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';
       
            if (status === 400) {
                //이미 공유된 앨범에 대해 요청을 보낸 경우
                if (error.response.data.data.errorClassName === 'ALREADY_SHARED_ALBUMR') {
                    alert(errorMessage);
                } //해당 앨범의 소유주가 아닐떄 
                else if (error.response.data.data.errorClassName === 'NOT_ALBUM_OWNER') {
                    alert(errorMessage);
                }
            } else if (status === 404) {
                //앨범 id가 존재하지 않을때
                if (error.response.data.data.errorClassName === 'ALBUM_NOT_FOUND') {
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
