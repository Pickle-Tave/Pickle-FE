import {
  SET_HASHTAGS,
  ADD_HASHTAG,
  REMOVE_HASHTAG,
} from '../actions/ImageHashTagAction';

const initialState = {
  hashTags: {},
  error: null,
};

const ImageHashTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HASHTAGS:
      return {...state, hashTags: action.payload};
    case ADD_HASHTAG:
      const {imageId, hashTag} = action.payload;
      if (!state.hashTags[imageId]) {
        state.hashTags[imageId] = [];
      }
      return {
        ...state,
        hashTags: {
          ...state.hashTags,
          [imageId]: [...state.hashTags[imageId], hashTag],
        },
      };
    case REMOVE_HASHTAG:
      const {imageId: removeId, hashTag: removeTag} = action.payload;
      return {
        ...state,
        hashTags: {
          ...state.hashTags,
          [removeId]: state.hashTags[removeId].filter(tag => tag !== removeTag),
        },
      };
    default:
      return state;
  }
};

export default ImageHashTagReducer;
