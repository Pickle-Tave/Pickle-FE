//앨범명 검색시
export const INITIALIZE_SEARCHED_ALBUM = 'INITIALIZE_SEARCHED_ALBUM';
export const FETCH_SEARCHED_ALBUM_REQUEST = 'FETCH_SEARCHED_ALBUM_REQUEST';
export const FETCH_SEARCHED_ALBUM_SUCCESS = 'FETCH_SEARCHED_ALBUM_SUCCESS';
export const FETCH_SEARCHED_ALBUM_ERROR = 'FETCH_SEARCHED_ALBUM_ERROR';

export const InitializeSearchedAlbum = () => ({
    type: INITIALIZE_SEARCHED_ALBUM,
})

export const fetchSearchedAlbumRequest = () => ({
    type: FETCH_SEARCHED_ALBUM_REQUEST,
});

export const fetchSearchedAlbumSuccess = (res) => ({
    type: FETCH_SEARCHED_ALBUM_SUCCESS,
    payload: res,
});

export const fetchSearchedAlbumError = (error) => ({
    type: FETCH_SEARCHED_ALBUM_ERROR,
    payload: error,
})