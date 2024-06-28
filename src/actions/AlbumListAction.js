//앨범목록 상태관리

//API연동부분
export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_ERROR = 'FETCH_ALBUM_ERROR';

//API연동부분 
export const fetchAlbumRequest = () => ({
    type: FETCH_ALBUM_REQUEST,
})

export const fetchAlbumSucess = (res) => ({
    type: FETCH_ALBUM_SUCCESS,
    payload: {
        res
    }
})

export const fetchAlbumError = (error) => ({
    type: FETCH_ALBUM_ERROR,
    payload: error,
})