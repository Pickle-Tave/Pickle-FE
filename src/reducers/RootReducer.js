import {combineReducers} from 'redux';
import HashTagReducer from './HashTagReducer';
import AlbumReducer from './AlbumReducer';
import AlbumImageReducer from './AlbumImageReducer';
import AlbumLikeReducer from './AlbumLikeReducer';
import ImageHashTagReducer from './ImageHashTagReducer';

const RootReducer = combineReducers({
  HashTagReducer,
  AlbumReducer,
  AlbumImageReducer,
  AlbumLikeReducer,
  ImageHashTagReducer,
});

export default RootReducer;
