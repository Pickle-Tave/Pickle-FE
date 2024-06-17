import { useRef } from "react";
const hashtag_idRef = useRef(6);

const ADD_HASHTAG = 'ADD_HASHTAG';
const DELETE_HASHTAG = 'DELETE_HASHTAG';

export const addHashTag = (hashtag_id, text) => ({ //해시태그 생성하기 위해서는 id와 해시태그 값 받기
    type: ADD_HASHTAG,
    payload: {
        hashtag_id: hashtag_idRef++,
        text
    }
})

export const deleteHashTag = (hashtag_id) => ({
    type: DELETE_HASHTAG,
    payload: {
        hashtag_id
    }
})