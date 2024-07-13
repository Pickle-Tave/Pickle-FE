import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLikeRequest, fetchLikeSuccess, fetchLikeError } from '../src/actions/AlbumLikeAction';
import { REACT_APP_BASE_URL } from '@env';


const instance = axios.create({
    baseURL: REACT_APP_BASE_URL, // API 서버 주소
  });

export const SearchAlbumLike = (lastAlbumId, size) => {
    return async (dispatch) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            dispatch(fetchLikeRequest());
            const response = await instance.get(
                '/albums/search/heart',
                {
                    params: {
                        lastAlbumId: lastAlbumId,
                        size: size,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );

            dispatch(fetchLikeSuccess(response.data.data));

            console.log('즐겨찾기 응답:', response.data); // 백엔드 응답 로그 출력
            return response.data;
        } catch (error) {
            dispatch(fetchLikeError(error));

            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

            if (status === 404) {
                if (error.response.data.data.errorClassName === 'BOOKMARKED_ALBUM_NOT_FOUND') {
                    alert(errorMessage);
                }
            } else {
                alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
            throw error;
        }
    }
};
