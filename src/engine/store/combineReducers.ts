import {combineReducers} from "redux";
import app from './app/appReducer'
import consultation from './consultation/consultationReducer'
import {IReducerInterface} from "./reducerInterface";

export default combineReducers<IReducerInterface>({
    app,
    consultation,
})