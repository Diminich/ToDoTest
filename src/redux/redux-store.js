import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import taskReducer from "./task-reducer";

let reducers = combineReducers({
    taskPage: taskReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store