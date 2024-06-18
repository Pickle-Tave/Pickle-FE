import { ADD_HASHTAG,DELETE_HASHTAG } from "../actions/HashTagAction"

const initialState = [
    {
        tag_id: 1,
        tag_name: "동물"
    },
    {
        tag_id: 2,
        tag_name: "여행"
    },
    {
        tag_id: 3,
        tag_name: "일상"
    },
    {
        tag_id: 4,
        tag_name: "청춘"
    },
    {
        tag_id: 5,
        tag_name: "행복"
    },
]

const HashTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HASHTAG:
            return [...state, action.payload]
        case DELETE_HASHTAG:
            return state.filter((item) =>
                String(item.tag_id) !== String(action.tag_id))
        default:
            return state;
    }
}

export default HashTagReducer;