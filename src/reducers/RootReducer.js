import { combineReducers } from "redux";
import HashTagReducer from "./HashTagReducer";
import AlbumReducer from "./AlbumReducer";
import AlbumImageReducer from "./AlbumImageReducer";
import AlbumLikeReducer from "./AlbumLikeReducer";


const RootReducer = combineReducers({
    HashTagReducer,
    AlbumReducer,
    AlbumImageReducer,
    AlbumLikeReducer
})

export default RootReducer;