import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSearchedAlbumRequest, fetchSearchedAlbumSuccess, fetchSearchedAlbumError } from '../src/actions/SearchedAlbumAction';


export const SearchAlbumName = (keyword, lastAlbumId, size) => {
    return async (dispatch) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            dispatch(fetchSearchedAlbumRequest());
            const response = await instance.get(
                '/albums/search/keyword', {
                params: {
                    keyword: keyword,
                    lastAlbumId: lastAlbumId,
                    size: size,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            );

            dispatch(fetchSearchedAlbumSuccess(response.data.data));

            console.log('앨범명 검색 응답:', response.data.data);
            return response.data.data;
        } catch (error) {
            dispatch(fetchSearchedAlbumError(error));

            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

            if (status === 404) {
                if (error.response.data.data.errorClassName === 'ALBUM_KEYWORD_NOT_FOUND') {
                    alert(errorMessage);
                }
            } else {
                alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
            throw error;
        }
    }
};