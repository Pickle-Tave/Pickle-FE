import {
  ADD_ALBUM,
  UPDATE_ALBUM_NAME,
  UPDATE_ALBUM_TYPE,
  DELETE_ALBUM,
  COPY_ALBUM,
} from '../actions/AlbumAction';

const initialState = [
  {
    album_id: 1,
    album_name: '일본여행',
    album_type: '개인앨범',
  },
  {
    album_id: 2,
    album_name: '미국여행',
    album_type: '개인앨범',
  },
  {
    album_id: 3,
    album_name: '셀카',
    album_type: '공유앨범',
  },
  {
    album_id: 4,
    album_name: '동물',
    album_type: '공유앨범',
  },
  {
    album_id: 5,
    album_name: '부산여행',
    album_type: '개인앨범',
  },
  {
    album_id: 6,
    album_name: '강아지',
    album_type: '공유앨범',
  },
];

const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALBUM:
      return [...state, action.payload];
    case UPDATE_ALBUM_NAME:
      return state.map(item =>
        String(item.album_id) === String(action.payload.album_id)
          ? action.payload
          : item,
      );
    case UPDATE_ALBUM_TYPE:
      return state.map(item =>
        String(item.album_id) === String(action.payload.album_id)
          ? action.payload
          : item,
      );
    case COPY_ALBUM:
      return [...state, action.payload];
    case DELETE_ALBUM:
      return state.filter(
        item => String(item.album_id) !== String(action.album_id),
      );
    default:
      return state;
  }
};

export default AlbumReducer;
