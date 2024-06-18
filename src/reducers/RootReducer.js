import { combineReducers } from "redux";
import HashTagReducer from "./HashTagReducer";
import AlbumReducer from "./AlbumReducer";
import AlbumImageReducer from "./AlbumImageReducer";

const RootReducer = combineReducers({
    HashTagReducer,
    AlbumReducer,
    AlbumImageReducer
})

export default RootReducer;