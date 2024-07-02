export const INITIALIZE_LIKE = 'INITIALIZE_LIKE';
export const FETCH_LIKE_REQUEST = 'FETCH_LIKE_REQUEST';
export const FETCH_LIKE_SUCCESS = 'FETCH_LIKE_SUCCESS';
export const FETCH_LIKE_ERROR = 'FETCH_LIKE_ERROR';

export const InitializeLikeList = () => ({
    type: INITIALIZE_LIKE,
});

export const fetchLikeRequest = () => ({
    type: FETCH_LIKE_REQUEST,
});

export const fetchLikeSuccess = (res) => ({
    type: FETCH_LIKE_SUCCESS,
    payload: res,
});

export const fetchLikeError = (error) => ({
    type: FETCH_LIKE_ERROR,
    payload: error,
});