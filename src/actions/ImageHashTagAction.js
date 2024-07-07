export const ADD_HASHTAG = 'ADD_HASHTAG';

export const addHashTag = (imageUrls, hashtagId) => {
  console.log('Creating addHashTag action with:', imageUrls, hashtagId);

  return {
    type: ADD_HASHTAG,
    payload: {imageUrls, hashtagId},
  };
};
