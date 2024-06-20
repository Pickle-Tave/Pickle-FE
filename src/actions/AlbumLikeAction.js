//action type
export const ADD_ALBUM_LIKE = 'ADD_ALBUM_LIKE';
export const DELETE_ALBUM_LIKE = 'DELETE_ALBUM_LIKE';

//action객체 
export const addAlbumLike = (album_id, album_name, album_type) => ({
    type: ADD_ALBUM_LIKE,
    payload: {
        album_id,
        album_name,
        album_type
    }
})

export const deleteAlbumLike = (album_id) => ({
    type: DELETE_ALBUM_LIKE,
    album_id
})