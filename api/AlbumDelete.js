import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com', // API 서버 주소
  });

export const AlbumDelete = async (album_id) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.delete(
            `/albums/delete/${album_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        );
        console.log('앨범 삭제 응답:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

            if (status === 400) {
                if (error.response.data.data.errorClassName === 'MEMBER_NOT_HOST') {
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