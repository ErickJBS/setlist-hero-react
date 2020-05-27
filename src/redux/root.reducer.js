import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/auth.reducer';
import bandReducer from './band/band.reducer';



const rootReducer = combineReducers({
    auth: authReducer,
    band: persistReducer({
        key: 'band',
        storage: storage,
        blacklist: ['bands']
    }, bandReducer)
});

export default rootReducer;