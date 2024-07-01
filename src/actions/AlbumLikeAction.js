// API 연동부분
export const INITIALIZE_LIKE = 'INITIALIZE_LIKE';
export const FETCH_LIKE_REQUEST = 'FETCH_LIKE_REQUEST';
export const FETCH_LIKE_SUCCESS = 'FETCH_LIKE_SUCCESS';
export const FETCH_LIKE_ERROR = 'FETCH_LIKE_ERROR';

// API 연동 부분 

export const InitializeAlbumList = () => ({
    type: INITIALIZE_LIKE,
})

export const fetchAlbumRequest = () => ({
    type: FETCH_LIKE_REQUEST,
});

export const fetchAlbumSuccess = (res) => ({
    type: FETCH_LIKE_SUCCESS,
    payload: res,
});

export const fetchAlbumError = (error) => ({
    type: FETCH_LIKE_ERROR,
    payload: error,
});