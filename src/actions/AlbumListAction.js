// API 연동부분
export const INITIALIZE_ALBUM_LIST = 'INITIALIZE_ALBUM_LIST';
export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_ERROR = 'FETCH_ALBUM_ERROR';

// API 연동 부분 

export const InitializeAlbumList = () => ({
    type: INITIALIZE_ALBUM_LIST,
})

export const fetchAlbumRequest = () => ({
    type: FETCH_ALBUM_REQUEST,
});

export const fetchAlbumSuccess = (res) => ({
    type: FETCH_ALBUM_SUCCESS,
    payload: res,
});

export const fetchAlbumError = (error) => ({
    type: FETCH_ALBUM_ERROR,
    payload: error,
});
