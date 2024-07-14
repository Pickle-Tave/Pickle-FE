import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchHashtagError, fetchHashtagRequest, fetchHashtagSucess } from '../src/actions/HashTagAction';

export const HashTagListCheck = () => {
  return async (dispatch) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      dispatch(fetchHashtagRequest());
      const response = await instance.get(
        '/tags/list',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      console.log('해시태그 조회 응답:', response.data); 

      if (response.data.success) {
        dispatch(fetchHashtagSucess(response.data.data));
      } else {
        dispatch(fetchHashtagError(new Error('Failed to fetch hashtags')));
      }
      return response.data;
    } catch (error) {
      dispatch(fetchHashtagError(error));
      console.error('해시태그 목록 로딩 에러:', error);
      throw error;
    }
  };
};
