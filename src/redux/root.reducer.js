import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/auth.reducer';
import bandReducer from './band/band.reducer';
import musicianReducer from './musician/musician.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    musician: musicianReducer,
    band: persistReducer({
        key: 'band',
        storage: storage,
        blacklist: ['bands']
    }, bandReducer)
    
});

export default rootReducer;