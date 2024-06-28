import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetAlbumList = async (lastAlbumId, size) => {
    try {
   
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.get(
            '/albums/list',{
                params: {
                    lastAlbumId: lastAlbumId,
                    size: size,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('앨범 목록 응답:', response.data); // 백엔드 응답 로그 출력
        console.log('앨범 목록 응답 data', response.data.data)
        return response.data;
    } catch (error) {
        console.error('앨범 목록 에러:', error);
        throw error; 
    }
};
