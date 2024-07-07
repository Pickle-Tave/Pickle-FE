import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAlbumRequest, fetchAlbumSuccess, fetchAlbumError } from '../src/actions/AlbumListAction';

export const GetAlbumList = (lastAlbumId, size) => {
    return async (dispatch) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            dispatch(fetchAlbumRequest());
            const response = await instance.get(
                '/albums/list', {
                params: {
                    lastAlbumId: lastAlbumId,
                    size: size,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (response.data.success) {
                dispatch(fetchAlbumSuccess(response.data.data));
            } else {
                dispatch(fetchAlbumError(new Error('Failed to fetch album list')));
            }

            console.log('앨범 목록 응답 data', response.data.data);
            return response.data.data;
        } catch (error) {
            dispatch(fetchAlbumError(error));
            
            // 예외 처리하기
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

                if (status === 404) {
                    //앨범이 존재하지 않을때
                    if (error.response.data.data.errorClassName === 'ALBUM_NOT_EXISTS') {
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
};
