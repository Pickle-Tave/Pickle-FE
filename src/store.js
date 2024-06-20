import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import RootReducer from '../src/reducers/RootReducer';

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;