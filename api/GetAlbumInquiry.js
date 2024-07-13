import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchImagesRequest, fetchImagesSuccess, fetchImagesError } from '../src/actions/AlbumImageAction';
import { REACT_APP_BASE_URL } from '@env';


const instance = axios.create({
    baseURL: REACT_APP_BASE_URL, // API 서버 주소
});

export const GetAlbumInquiry = (lastImageId, size, albumId,) => {
    return async (dispatch) => {
        try {
            // Access token을 가져옵니다.
            const accessToken = await AsyncStorage.getItem('accessToken');

            // 요청 시작 액션
            dispatch(fetchImagesRequest());
            console.log('Request Params:', { albumId, lastImageId, size });

            // 앨범 정보를 요청합니다.
            const response = await instance.get(
                `/albums`, {
                params: {
                    lastImageId: lastImageId,
                    size: size,
                    albumId: albumId,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            // 요청 성공 시 상태 업데이트
            if (response.data.success) {
                console.log('개별 앨범 조회 응답', response.data.data); // 디버그용 로그
                dispatch(fetchImagesSuccess(response.data.data));
            } else {
                throw new Error('Failed to fetch images'); // 성공하지 않은 경우 예외를 던집니다.
            }

            console.log('개별 앨범 조회 응답', response.data.data);

            return response.data.data;
        } catch (error) {
            // 요청 실패 시 상태 업데이트
            //dispatch(fetchImagesError(error));

            // 예외 처리
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.data.message || '알 수 없는 에러가 발생했습니다.';

                console.log('개별 앨범 조회 오류', error.response.data);
                if (status === 404) {
                    // 앨범에 이미지가 존재하지 않을 때
                    if (error.response.data.data.errorClassName === 'IMAGE_NOT_FOUND_IN_ALBUM') {
                        alert(errorMessage);
                    }
                } else if (status === 400) {
                    // 해당 앨범의 소유주가 아닌 경우
                    if (error.response.data.data.errorClassName === 'NOT_ALBUM_OWNER') {
                        alert(errorMessage);
                    } else {
                        alert('잘못된 요청입니다.');
                    }
                } else {
                    alert('에러', '오류가 발생했습니다: ' + errorMessage);
                }
            } else if (error.request) {
                // 요청이 이루어졌으나 응답이 없는 경우
                console.error('Error Request:', error.request);
                alert('서버 응답이 없습니다. 잠시 후 다시 시도해주세요.');
            } else {
                // 요청 설정 중 문제가 발생한 경우
                console.error('Error Message:', error.message);
                alert('요청 중 오류가 발생했습니다.');
            }
            throw error;
        }
    };
};
