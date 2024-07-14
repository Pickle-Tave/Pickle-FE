import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AlbumCreate = async (album_name) => {
    try {
        console.log('album_name:', album_name);
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await instance.post(
            '/albums/create',
            { name: album_name }, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log('앨범 생성 응답:', response.data); 
        return response.data;
    } catch (error) {
        console.error('앨범 생성 에러:', error);
        throw error;
    }
};
