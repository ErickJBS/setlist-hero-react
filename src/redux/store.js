import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import rootReducer from './root.reducer';

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    devToolsEnhancer()
);

export const persistor = persistStore(store);
