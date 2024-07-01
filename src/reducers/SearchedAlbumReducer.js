import { INITIALIZE_SEARCHED_ALBUM, FETCH_SEARCHED_ALBUM_REQUEST, FETCH_SEARCHED_ALBUM_SUCCESS, FETCH_SEARCHED_ALBUM_ERROR } from "../actions/SearchedAlbumAction";

const initialState = {
    searchedAlbumList: [], // 응답에서의 앨범목록 저장
    lastAlbumId: null, // 마지막으로 반환받는 앨범 id
    first: true, //처음들어가는 요청인지
    last: false, // 마지막 요청인지 여부
    error: null
};

const SearchedAlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SEARCHED_ALBUM:
            return {
                searchedAlbumList: [],
                lastAlbumId: null,
                first: true,
                last: false,
                error: null
            };
        case FETCH_SEARCHED_ALBUM_REQUEST:
            return { ...state };
        case FETCH_SEARCHED_ALBUM_SUCCESS:
            const newAlbumList = [...state.searchedAlbumList, ...action.payload.content];
            const lastAlbumId = action.payload.content[action.payload.content.length - 1].albumId;
            const first = false;
            const last = action.payload.last;
            return {
                ...state,
                searchedAlbumList: newAlbumList,
                lastAlbumId: lastAlbumId,
                first: first,
                last: last,
            };
        case FETCH_SEARCHED_ALBUM_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default SearchedAlbumReducer;
