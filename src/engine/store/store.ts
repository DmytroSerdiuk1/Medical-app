import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './combineReducers'

export const store = createStore(reducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch