import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './root.reducer';

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    devToolsEnhancer()
);

export const persistor = persistStore(store);
