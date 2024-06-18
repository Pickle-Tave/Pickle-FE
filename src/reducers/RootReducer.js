import { combineReducers } from "redux";
import HashTagReducer from "./HashTagReducer";
import AlbumReducer from "./AlbumReducer";

const RootReducer = combineReducers({
    HashTagReducer,
    AlbumReducer,
})

export default RootReducer;