import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAlbumStatusRequest, fetchAlbumStatusSuccess, fetchAlbumStatusError } from '../src/actions/AlbumStatusAction';

export const SearchAlbumStatus = (albumStatus, lastAlbumId, size) => {
    return async (dispatch) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            dispatch(fetchAlbumStatusRequest());
            const response = await instance.get(
                '/albums/search/status',
                {
                    params: {
                        albumStatus: albumStatus,
                        lastAlbumId: lastAlbumId,
                        size: size,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            dispatch(fetchAlbumStatusSuccess(response.data.data));
            console.log('상태 검색 응답:', response.data); // 백엔드 응답 로그 출력
            return response.data.data;
        } catch (error) {
            console.error('상태 검색 에러:', error);
            dispatch(fetchAlbumStatusError());
            
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';
                if (status === 404) {
                    if (error.response.data.data.errorClassName === 'ALBUM_STATUS_NOT_FOUND') {
                        alert(errorMessage);
                    }
                } else {
                    alert('에러', '오류가 발생했습니다: ' + errorMessage);
                }
            } else {
                alert('알 수 없는 에러가 발생했습니다.');
            }
            throw error;
        }
    }
};
