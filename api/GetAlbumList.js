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
            console.error('앨범 목록 에러:', error);
            dispatch(fetchAlbumError(error));
            throw error;
        }
    };
};
