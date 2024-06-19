import { ADD_ALBUM_LIKE, DELETE_ALBUM_LIKE } from "../actions/AlbumLikeAction";

const initialState = []

const AlbumLikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALBUM_LIKE:
            return [...state, action.payload]
        case DELETE_ALBUM_LIKE:
            return state.filter((item) =>
                String(item.album_id) !== String(action.album_id))
        default:
            return state;
    }
}

export default AlbumLikeReducer;