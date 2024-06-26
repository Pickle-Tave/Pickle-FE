import { ADD_HASHTAG, DELETE_HASHTAG, FETCH_HASHTAG_LIST_REQUEST, FETCH_HASHTAG_LIST_SUCCESS, FETCH_HASHTAG_LIST_ERROR } from "../actions/HashTagAction"

const initialState = {
    hashtagList: [],
    error: null
}

const HashTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HASHTAG:
            return [...state, action.payload]
        case DELETE_HASHTAG:
            return state.filter((item) =>
                String(item.tag_id) !== String(action.tag_id))
        case FETCH_HASHTAG_LIST_REQUEST:
            return { ...state };
        case FETCH_HASHTAG_LIST_SUCCESS:
            return { ...state, hashtagList: action.payload.hashtagList }
        case FETCH_HASHTAG_LIST_ERROR:
            return { ...state, error: action.payload}
        default:
            return state;
    }
}

export default HashTagReducer;


