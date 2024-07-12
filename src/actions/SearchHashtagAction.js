//해시태그 검색시
export const INITIALIZE_SEARCHED_HASHTAG = 'INITIALIZE_SEARCHED_HASHTAG';
export const FETCH_SEARCHED_HASHTAG_REQUEST = 'FETCH_SEARCHED_HASHTAG_REQUEST';
export const FETCH_SEARCHED_HASHTAG_SUCCESS = 'FETCH_SEARCHED_HASHTAG_SUCCESS';
export const FETCH_SEARCHED_HASHTAG_ERROR = 'FETCH_SEARCHED_HASHTAG_ERROR';

export const InitializeSearchedHashtag = () => ({
    type: INITIALIZE_SEARCHED_HASHTAG,
})

export const fetchSearchedHashtagRequest = () => ({
    type: FETCH_SEARCHED_HASHTAG_REQUEST,
})

export const fetchSearchedHashtagSuccess = (res) => ({
    type: FETCH_SEARCHED_HASHTAG_SUCCESS,
    payload: res,
})

export const fetchSearchedHashtagError = (error) => ({
    type: FETCH_SEARCHED_HASHTAG_ERROR,
    payload: error,
})