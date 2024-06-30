// action type
export const SET_HASHTAGS = 'SET_HASHTAGS';
export const ADD_HASHTAG = 'ADD_HASHTAG';
export const REMOVE_HASHTAG = 'REMOVE_HASHTAG';

// action 객체 
export const setHashTags = (hashTags) => ({
  type: SET_HASHTAGS,
  payload: hashTags,
});

export const addHashTag = (imageId, hashTag) => ({
  type: ADD_HASHTAG,
  payload: { imageId, hashTag },
});

export const removeHashTag = (imageId, hashTag) => ({
  type: REMOVE_HASHTAG,
  payload: { imageId, hashTag },
});

// 수정
export const fetchHashTags = () => async (dispatch) => {
  try {
    // API 호출
    // const response = await fetch('');
    // const data = await response.json();

    /* 예시 데이터
    const data = {
      'image1': ['#example1', '#example2'],
      'image2': ['#example3', '#example4'],
    };*/

    // dispatch(setHashTags(data));
  } catch (error) {
    console.error('Failed to fetch hashTags', error);
  }
};
