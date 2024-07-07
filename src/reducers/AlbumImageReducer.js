import { ADD_ALBUM_IMAGE, DELETE_ALBUM_IMAGE, INITIALIZE_ALBUM_IMAGES, FETCH_IMAGES_REQUEST, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_ERROR } from "../actions/AlbumImageAction";

const initialState = {
  imageList: [],
  lastImageId: null,
  first: true,
  last: false,
  error: null,
}

const AlbumImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALBUM_IMAGE:
      return [...state, action.payload]
    case DELETE_ALBUM_IMAGE:
      return state.filter((item) =>
        String(item.image_id) !== String(action.image_id))
    case INITIALIZE_ALBUM_IMAGES:
      return {
        imageList: [],
        lastImageId: null,
        first: true,
        last: false,
        error: null,
      }
    case FETCH_IMAGES_REQUEST:
      return { ...state }
    case FETCH_IMAGES_SUCCESS:
      const newImageList = [...state.imageList, ...action.payload.content];
      const lastImageId = action.payload.content[action.payload.content.length - 1].imageId;
      const first = false;
      const last = action.payload.last;
      return {
        ...state,
        imageList: newImageList,
        lastImageId: lastImageId,
        first: first,
        last: last,
      };
    case FETCH_IMAGES_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}

export default AlbumImageReducer;