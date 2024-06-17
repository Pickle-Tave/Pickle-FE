import { ADD_HASHTAG,DELETE_HASHTAG } from "../actions/HashTagAction"

const initialState = [
    {
        id: 1,
        text: "동물"
    },
    {
        id: 2,
        text: "여행"
    },
    {
        id: 3,
        text: "일상"
    },
    {
        id: 4,
        text: "청춘"
    },
    {
        id: 5,
        text: "행복"
    },
]

const HashTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HASHTAG:
            return [...state, action.payload]
        case DELETE_HASHTAG:
            return state.filter((item) =>
                String(item.id) !== String(action.id))
        default:
            return state;
    }
}

export default HashTagReducer;