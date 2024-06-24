// 인증코드 받아서 토큰 요청

import instance from './axios';

//앨범네임은 AlbumPlusModal에서 입력받은 값을 받아와야 한다. 
export const AlbumCreate = async album_name => {
    try {
        console.log('album_name:', album_name);
        const response = await instance.post(
            '/albums/create',
            { code: album_name }, // 링크에서 빼낸 카카오 인증 코드
        );
        console.log('Received response from backend:', response); // 백엔드 응답 로그 출력
        return response;
    } catch (error) {
        console.error('앨범 생성 에러:', error);
        throw error;
    }
};
