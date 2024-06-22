//action type
export const ADD_ALBUM = 'ADD_ALBUM';
export const UPDATE_ALBUM_NAME = 'UPDATE_ALBUM_NAME';
export const UPDATE_ALBUM_TYPE = 'UPDATE_ALBUM_TYPE';
export const COPY_ALBUM = 'COPY_ALBUM';
export const DELETE_ALBUM = 'DELETE_ALBUM';

//action객체 
export const addAlbum = (album_id, album_name, album_type) => ({ //해시태그 생성하기 위해서는 id와 해시태그 값 받기
    type: ADD_ALBUM,
    payload: {
        album_id,
        album_name,
        album_type,
    }
})

export const updateAlbumName = (album_id, album_name, album_type) => ({
    type: UPDATE_ALBUM_NAME,
    payload: {
        album_id,
        album_name,
        album_type
    }
})

export const updateAlbumType = (album_id, album_name, album_type) => ({
    type: UPDATE_ALBUM_TYPE,
    payload: {
        album_id,
        album_name,
        album_type
    }
})

export const copyAlbum = (album_id, album_name, album_type) => ({
    type: COPY_ALBUM,
    payload: {
        album_id,
        album_name,
        album_type,
    }
})

export const deleteAlbum = (album_id) => ({
    type: DELETE_ALBUM,
    album_id,
})