import { INITIALIZE_LIKE, FETCH_LIKE_REQUEST, FETCH_LIKE_SUCCESS, FETCH_LIKE_ERROR } from "../actions/AlbumLikeAction";

const initialState = {
    likeList: [], // 응답에서의 좋아요 목록 저장
    lastAlbumId: null, // 마지막으로 반환받는 앨범 id
    first: true, //처음들어가는 요청인지
    last: false, // 마지막 요청인지 여부
    error: null
};

const AlbumLikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_LIKE:
            return {
                likeList: [],
                lastAlbumId: null,
                first: true,
                last: false,
                error: null
            };
        case FETCH_LIKE_REQUEST:
            return { ...state };
        case FETCH_LIKE_SUCCESS:
            const newLikeList = [...state.likeList, ...action.payload.content];
            const lastAlbumId = action.payload.content[action.payload.content.length - 1].albumId;
            const first = false;
            const last = action.payload.last;
            return {
                ...state,
                likeList: newLikeList,
                lastAlbumId: lastAlbumId,
                first: first,
                last: last,
            };
        case FETCH_LIKE_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default AlbumLikeReducer;