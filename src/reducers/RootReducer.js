import {combineReducers} from 'redux';
import HashTagReducer from './HashTagReducer';
import AlbumReducer from './AlbumReducer';
import AlbumImageReducer from './AlbumImageReducer';
import AlbumLikeReducer from './AlbumLikeReducer';
import AlbumListReducer from './AlbumListReducer';
import SearchedAlbumReducer from './SearchedAlbumReducer';
import ImageHashTagReducer from './ImageHashTagReducer';

const RootReducer = combineReducers({
  HashTagReducer,
  AlbumReducer,
  AlbumImageReducer,
  AlbumLikeReducer,
  AlbumListReducer,
  ImageHashTagReducer,
  SearchedAlbumReducer,
});

export default RootReducer;
