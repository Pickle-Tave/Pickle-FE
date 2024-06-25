import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//앨범네임은 AlbumPlusModal에서 입력받은 값을 받아와야 한다. 
export const AlbumCreate = async (album_name) => {
    try {
        console.log('album_name:', album_name);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            '/albums/create',
            { name: album_name }, // 링크에서 빼낸 카카오 인증 코드
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('Received response from backend:', response.data); // 백엔드 응답 로그 출력
        return response.data;
    } catch (error) {
        console.error('앨범 생성 에러:', error);
        throw error;
    }
};
