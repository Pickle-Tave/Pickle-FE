//API연동 부분 
export const INITIALIZE_ALBUM_IMAGES = 'INITIALIZE_ALBUM_IMAGES';
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR';

//API연동 action객체
export const InitializeAlbumImages = () => ({
    type: INITIALIZE_ALBUM_IMAGES,
  });

export const fetchImagesRequest = () => ({
    type: FETCH_IMAGES_REQUEST,
})

export const fetchImagesSuccess = (res) => ({
    type: FETCH_IMAGES_SUCCESS,
    payload: res,
})


export const fetchImagesError = (error) => ({
    type: FETCH_IMAGES_ERROR,
    payload: error,
})