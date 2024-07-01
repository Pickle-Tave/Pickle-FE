import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSearchedAlbumRequest, fetchSearchedAlbumSuccess, fetchSearchedAlbumError } from '../src/actions/SearchedAlbumAction';


export const SearchAlbumName = (keyword, lastAlbumId, size) => {
    return async (dispatch) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            dispatch(fetchSearchedAlbumRequest());
            const response = await instance.get(
                '/albums/search/keyword',{
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
            console.error('앨범명 검색 에러:', error);
            dispatch(fetchSearchedAlbumError(error));
            throw error;
        }
    }
};