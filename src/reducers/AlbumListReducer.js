import { FETCH_ALBUM_REQUEST, FETCH_ALBUM_SUCCESS, FETCH_ALBUM_ERROR, INITIALIZE_ALBUM_LIST } from "../actions/AlbumListAction";

const initialState = {
    albumList: [], // 응답에서의 앨범목록 저장
    lastAlbumId: null, // 마지막으로 반환받는 앨범 id
    first: true, //처음들어가는 요청인지
    last: false, // 마지막 요청인지 여부
    error: null
};

const AlbumListReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_ALBUM_LIST:
            return {
                albumList: [],
                lastAlbumId: null,
                first: true,
                last: false,
                error: null
            };
        case FETCH_ALBUM_REQUEST:
            return { ...state };
        case FETCH_ALBUM_SUCCESS:
            const newAlbumList = [...state.albumList, ...action.payload.content];
            const lastAlbumId = action.payload.content[action.payload.content.length - 1].albumId;
            const first = false;
            const last = action.payload.last;
            return {
                ...state,
                albumList: newAlbumList,
                lastAlbumId: lastAlbumId,
                first: first,
                last: last,
            };
        case FETCH_ALBUM_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default AlbumListReducer;
