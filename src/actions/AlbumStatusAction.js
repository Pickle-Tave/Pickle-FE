//앨범명 검색시
export const INITIALIZE_ALBUM_STATUS = 'INITIALIZE_ALBUM_STATUS';
export const FETCH_ALBUM_STATUS_REQUEST = 'FETCH_ALBUM_STATUS_REQUEST';
export const FETCH_ALBUM_STATUS_SUCCESS = 'FETCH_ALBUM_STATUS_SUCCESS';
export const FETCH_ALBUM_STATUS_ERROR = 'FETCH_ALBUM_STATUS_ERROR';

export const InitializeAlbumStatus = () => ({
    type: INITIALIZE_ALBUM_STATUS,
})

export const fetchAlbumStatusRequest = () => ({
    type: FETCH_ALBUM_STATUS_REQUEST,
});

export const fetchAlbumStatusSuccess = (res) => ({
    type: FETCH_ALBUM_STATUS_SUCCESS,
    payload: res,
});

export const fetchAlbumStatusError = (error) => ({
    type: FETCH_ALBUM_STATUS_ERROR,
    payload: error,
})