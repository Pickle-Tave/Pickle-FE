import {ADD_HASHTAG} from '../actions/ImageHashTagAction';

const initialState = {
  hashTags: [], // 각 이미지 URL에 할당된 해시태그를 저장하는 객체
};

const ImageHashTagReducer = (state = [initialState], action) => {
  console.log('Reducer called with action:', action); // 리듀서 호출 로그

  switch (action.type) {
    case ADD_HASHTAG:
      const {imageUrls, hashtagId} = action.payload;

      // 디버깅 로그 추가
      console.log('Reducer action:', action);
      console.log('Reducer state before:', state);

      // state.hashTags가 객체인지 확인
      if (typeof state.hashTags !== 'object' || state.hashTags === null) {
        throw new TypeError('state.hashTags is not a valid object');
      }

      // imageUrls가 배열인지 확인
      if (!Array.isArray(imageUrls)) {
        throw new TypeError('imageUrls is not a valid array');
      }

      // newHashTags 초기화
      const newHashTags = {...state.hashTags};

      // imageUrls 배열을 순회하며 해시태그 ID 할당
      imageUrls.forEach(url => {
        newHashTags[url] = hashtagId; // 각 이미지 URL을 키로, 해시태그 ID를 값으로 저장
      });

      console.log('newHashTags:', newHashTags);
      console.log('Reducer state after:', {...state, hashTags: newHashTags});

      return {
        ...state,
        hashTags: newHashTags,
      };
    default:
      return state;
  }
};

export default ImageHashTagReducer;
