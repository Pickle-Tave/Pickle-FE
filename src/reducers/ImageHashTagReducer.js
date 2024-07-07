import {ADD_HASHTAG} from '../actions/ImageHashTagAction';

const initialState = {
  hashTags: [], // 각 이미지 URL에 할당된 해시태그를 저장하는 객체
};

const ImageHashTagReducer = (state = [initialState], action) => {
  // console.log('Reducer called with action:', action);

  switch (action.type) {
    case ADD_HASHTAG:
      const {imageUrls, hashtagId} = action.payload;
      if (!Array.isArray(imageUrls)) {
        console.error('imageUrls must be an array, got:', typeof imageUrls);
        return state; // 오류 방지를 위해 초기 상태 반환
      }

      const newHashTags = {...state.hashTags};
      imageUrls.forEach(url => {
        newHashTags[url] = hashtagId;
      });
      return {
        ...state,
        hashTags: newHashTags,
      };
  }
};

export default ImageHashTagReducer;
