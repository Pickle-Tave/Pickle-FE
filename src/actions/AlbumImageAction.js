//action type
export const ADD_ALBUM_IMAGE = 'ADD_ALBUM_IMAGE';
export const DELETE_ALBUM_IMAGE = 'DELETE_ALBUM_IMAGE';

//API연동 부분 
export const INITIALIZE_ALBUM_IMAGES = 'INITIALIZE_ALBUM_IMAGES';
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR';

//action객체 
export const addAlbumImage = (image_id, user_id, album_id, src) => ({
    type: ADD_ALBUM_IMAGE,
    payload: {
        image_id,
        user_id,
        album_id,
        src,
    }
})

export const deleteAlbumImage = (image_id) => ({
    type: DELETE_ALBUM_IMAGE,
    image_id
})


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