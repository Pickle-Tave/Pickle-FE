import { ADD_ALBUM_IMAGE, DELETE_ALBUM_IMAGE } from "../actions/AlbumImageAction";

const initialState = [
  {
    image_id: 1,
    user_id: "jina",
    album_id: 1,
    src: require('../../assets/icon/photo1.png')
  },
  {
    image_id: 2,
    user_id: "jina",
    album_id: 1,
    src: require('../../assets/icon/photo1.png')
  },
  {
    image_id: 3,
    user_id: "jina",
    album_id: 1,
    src: require('../../assets/icon/photo2.png')
  },
  {
    image_id: 4,
    user_id: "jina",
    album_id: 1,
    src: require('../../assets/icon/photo3.png')
  },
  {
    image_id: 5,
    user_id: "jina",
    album_id: 1,
    src: require('../../assets/icon/photo4.png')
  },
  {
    image_id: 6,
    user_id: "jina",
    album_id: 1,
    src: require('../../assets/icon/photo5.png')
  },
  {
    image_id: 7,
    user_id: "jina",
    album_id: 2,
    src: require('../../assets/icon/photo1.png')
  },
  {
    image_id: 8,
    user_id: "jina",
    album_id: 2,
    src: require('../../assets/icon/photo1.png')
  },
  {
    image_id: 9,
    user_id: "jina",
    album_id: 2,
    src: require('../../assets/icon/photo2.png')
  },
  {
    image_id: 10,
    user_id: "jina",
    album_id: 2,
    src: require('../../assets/icon/photo3.png')
  },
  {
    image_id: 11,
    user_id: "jina",
    album_id: 2,
    src: require('../../assets/icon/photo4.png')
  },
  {
    image_id: 12,
    user_id: "jina",
    album_id: 2,
    src: require('../../assets/icon/photo5.png')
  }
]

const AlbumImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALBUM_IMAGE:
            return [...state, action.payload]
        case DELETE_ALBUM_IMAGE:
            return state.filter((item) =>
                String(item.image_id) !== String(action.image_id))
        default:
            return state;
    }
}

export default AlbumImageReducer;