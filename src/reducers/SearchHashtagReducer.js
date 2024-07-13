import {
    INITIALIZE_SEARCHED_HASHTAG,
    FETCH_SEARCHED_HASHTAG_REQUEST,
    FETCH_SEARCHED_HASHTAG_SUCCESS,
    FETCH_SEARCHED_HASHTAG_ERROR
} from "../actions/SearchHashtagAction";

const initialState = {
    searchHashtagList: [],
    lastImageId: null,
    first: true,
    last: false,
    error: null,
}

const SearchHashTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SEARCHED_HASHTAG:
            return {
                searchHashtagList: [],
                lastImageId: null,
                first: true,
                last: false,
                error: null,
            };
        case FETCH_SEARCHED_HASHTAG_REQUEST:
            return { ...state };
        case FETCH_SEARCHED_HASHTAG_SUCCESS:
            const newImageList = [...state.searchHashtagList, ...action.payload.content];
            const lastImageId = action.payload.content[action.payload.content.length - 1].imageId;
            return {
                ...state,
                searchHashtagList: newImageList,
                lastImageId,
                first: false,
                last: action.payload.last,
            };
        case FETCH_SEARCHED_HASHTAG_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default SearchHashTagReducer;