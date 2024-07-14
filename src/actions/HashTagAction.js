//api연동부분 type
export const FETCH_HASHTAG_LIST_REQUEST = 'FETCH_HASHTAG_LIST_REQUEST';
export const FETCH_HASHTAG_LIST_SUCCESS = 'FETCH_HASHTAG_LIST_SUCESS';
export const FETCH_HASHTAG_LIST_ERROR = 'FETCH_HASHTAG_LIST_ERROR';

export const fetchHashtagRequest = () => ({
  type: FETCH_HASHTAG_LIST_REQUEST,
});

export const fetchHashtagError = error => ({
  type: FETCH_HASHTAG_LIST_ERROR,
  payload: error,
});

export const fetchHashtagSucess = hashtagList => ({
  type: FETCH_HASHTAG_LIST_SUCCESS,
  payload: {hashtagList},
});
