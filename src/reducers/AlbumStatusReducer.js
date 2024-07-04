import { INITIALIZE_ALBUM_STATUS, FETCH_ALBUM_STATUS_REQUEST, FETCH_ALBUM_STATUS_SUCCESS, FETCH_ALBUM_STATUS_ERROR } from "../actions/AlbumStatusAction";

const initialState = {
    statusList: [],
    lastAlbumId: null,
    first: true,
    last: false,
    error: null,
};

const AlbumStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_ALBUM_STATUS:
            return initialState;
        case FETCH_ALBUM_STATUS_REQUEST:
            return { ...state };
        case FETCH_ALBUM_STATUS_SUCCESS:
            const newAlbumList = [...state.statusList, ...action.payload.content];
            const lastAlbumId = action.payload.content.length > 0 ? action.payload.content[action.payload.content.length - 1].albumId : null;
            const first = false;
            const last = action.payload.content.length === 0 || action.payload.last;

            return {
                ...state,
                statusList: newAlbumList,
                lastAlbumId,
                first,
                last,
            };
        case FETCH_ALBUM_STATUS_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default AlbumStatusReducer;
