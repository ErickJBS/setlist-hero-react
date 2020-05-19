import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root.reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    devToolsEnhancer()
);

export default store;