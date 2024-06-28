import { FETCH_ALBUM_REQUEST, FETCH_ALBUM_SUCCESS, FETCH_ALBUM_ERROR } from "../actions/AlbumListAction";

const initialState = {
    albumList: [], //응답에서의 앨범목록 저장
    lastAlbumId: null, //마지막으로 반환받는 앨범 id
    last: false, //마지막 요청인지 여부
    error: null
}

const HashTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUM_REQUEST:
            return { ...state }
        case FETCH_ALBUM_SUCCESS:
            const newAlbumList = [...state.albumList, ...action.payload.res.content];
            const lastAlbumId = action.payload.res.content[action.payload.res.content.length - 1].albumId;
            const last = action.payload.res.last;
            return {
                ...state,
                albumList: newAlbumList,
                lastAlbumId: lastAlbumId,
                last: last,
            };
        case FETCH_ALBUM_ERROR:
            return { ...state, error: action.payload}
        default:
            return state;
    }
}

export default HashTagReducer;