import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSearchedHashtagRequest, fetchSearchedHashtagSuccess, fetchSearchedHashtagError } from '../src/actions/SearchHashtagAction';

export const SearchHashTagImages = (lastImageId, size, albumId, tagName) => {
    return async (dispatch) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            dispatch(fetchSearchedHashtagRequest());
            const response = await instance.get(
                '/images/search/tag', {
                params: {
                    lastImageId: lastImageId,
                    size: size,
                    albumId: albumId,
                    tagName: tagName,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            );

            dispatch(fetchSearchedHashtagSuccess(response.data.data));

            console.log('해시태그 검색 응답:', response.data.data);
            return response.data.data;
        } catch (error) {
            dispatch(fetchSearchedHashtagError(error));

            const status = error.response.status;
            const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

            if (status === 400) {
                //앨범 소유자가 아닌 경우
                if (error.response.data.data.errorClassName === 'NOT_ALBUM_OWNER') {
                    alert(errorMessage);
                }//해시태그 소유자가 아닌 경우
                else if (error.response.data.data.errorClassName === 'NOT_TAG_OWNER') {
                    alert(errorMessage);
                }
            } else if (status === 404) {
                //해시태그에 대하여 이미지가 존재하지 않는 경우
                if (error.response.data.data.errorClassName === 'IMAGE_NOT_FOUND_BY_TAG') {
                    alert(errorMessage);
                }
            } else {
                alert('에러', '오류가 발생했습니다: ' + errorMessage);
            }
            throw error;
        }
    }
};