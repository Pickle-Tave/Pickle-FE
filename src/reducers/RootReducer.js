import {combineReducers} from 'redux';
import HashTagReducer from './HashTagReducer';
import AlbumImageReducer from './AlbumImageReducer';
import AlbumLikeReducer from './AlbumLikeReducer';
import AlbumListReducer from './AlbumListReducer';
import SearchedAlbumReducer from './SearchedAlbumReducer';
import ImageHashTagReducer from './ImageHashTagReducer';
import AlbumStatusReducer from './AlbumStatusReducer';
import SearchHashTagReducer from './SearchHashtagReducer';

const RootReducer = combineReducers({
  HashTagReducer,
  AlbumImageReducer,
  AlbumLikeReducer,
  AlbumListReducer,
  SearchedAlbumReducer,
  AlbumStatusReducer,
  SearchHashTagReducer
});

export default RootReducer;
