//action type
export const ADD_HASHTAG = 'ADD_HASHTAG';
export const DELETE_HASHTAG = 'DELETE_HASHTAG';

//api연동부분 type
//요청을 보낼때는 요청, 성공했을때의 응답, 실패의 세가지 type이 있다.
export const FETCH_HASHTAG_LIST_REQUEST = 'FETCH_HASHTAG_LIST_REQUEST';
export const FETCH_HASHTAG_LIST_SUCCESS = 'FETCH_HASHTAG_LIST_SUCESS';
export const FETCH_HASHTAG_LIST_ERROR = 'FETCH_HASHTAG_LIST_ERROR';

//action객체
export const addHashTag = (tag_id, tag_name) => ({
  //해시태그 생성하기 위해서는 id와 해시태그 값 받기
  type: ADD_HASHTAG,
  payload: {
    tag_id,
    tag_name,
  },
});

export const deleteHashTag = tag_id => ({
  type: DELETE_HASHTAG,
  tag_id,
});

//요청시 사용
export const fetchHashtagRequest = () => ({
  type: FETCH_HASHTAG_LIST_REQUEST,
});

//에러 발생시 사용
export const fetchHashtagError = error => ({
  type: FETCH_HASHTAG_LIST_ERROR,
  payload: error,
});

export const fetchHashtagSucess = hashtagList => ({
  type: FETCH_HASHTAG_LIST_SUCCESS,
  payload: {hashtagList},
});
