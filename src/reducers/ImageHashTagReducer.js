import {SET_HASHTAGS, ADD_HASHTAG} from '../actions/ImageHashTagAction';

const initialState = {
  hashTags: {}, // 각 이미지 그룹에 할당된 해시태그를 저장하는 객체
  hashtagList: [], // 해시태그 목록
};

const ImageHashTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HASHTAGS:
      return {...state, hashtagList: action.payload}; // 해시태그 목록 설정
    case ADD_HASHTAG:
      const {imageId, hashTag} = action.payload;
      return {
        ...state,
        hashTags: {
          ...state.hashTags,
          [imageId]: hashTag, // 선택한 해시태그를 저장
        },
      };
    default:
      return state;
  }
};

export default ImageHashTagReducer;
