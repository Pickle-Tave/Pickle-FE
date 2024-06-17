//action type
export const ADD_HASHTAG = 'ADD_HASHTAG';
export const DELETE_HASHTAG = 'DELETE_HASHTAG';

//action객체 
export const addHashTag = (id, text) => ({ //해시태그 생성하기 위해서는 id와 해시태그 값 받기
    type: ADD_HASHTAG,
    payload: {
        id,
        text,
    }
})

export const deleteHashTag = (id) => ({
    type: DELETE_HASHTAG,
    id,
})