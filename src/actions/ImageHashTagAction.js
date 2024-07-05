// 액션 타입 정의
export const SET_HASHTAGS = 'SET_HASHTAGS';
export const ADD_HASHTAG = 'ADD_HASHTAG';

// 해시태그 목록 설정 액션
export const setHashTags = hashTags => ({
  type: SET_HASHTAGS,
  payload: hashTags,
});

// 해시태그 추가 액션
export const addHashTag = (imageId, hashTag) => ({
  type: ADD_HASHTAG,
  payload: {imageId, hashTag},
});
