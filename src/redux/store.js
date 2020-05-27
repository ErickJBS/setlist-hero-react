import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root.reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {};


const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['band']
}

export const store = createStore(
    rootReducer,
    initialState,
    devToolsEnhancer()
);

export const persistor = persistStore(store);
