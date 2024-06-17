const initialState = [
    {
        hashtag_id: 1,
        text: "동물"
    },
    {
        hashtag_id: 2,
        text: "여행"
    },
    {
        hashtag_id: 3,
        text: "일상"
    },
    {
        hashtag_id: 4,
        text: "청춘"
    },
    {
        hashtag_id: 5,
        text: "행복"
    },
]

const HashTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_HASHTAG":
            return [...state, action.payload]
        case "DELETE_HASHTAG":
            return state.filter((item) =>
                String(item.hashtag_id) !== String(action.hashtag_id))
        default:
            return state;
    }
}

export default HashTagReducer;