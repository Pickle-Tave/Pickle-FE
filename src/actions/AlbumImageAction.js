//action type
export const ADD_ALBUM_IMAGE = 'ADD_ALBUM_IMAGE';
export const DELETE_ALBUM_IMAGE = 'DELETE_ALBUM_IMAGE';

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