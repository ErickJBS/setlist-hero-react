import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/auth.reducer';
import bandReducer from './band/band.reducer';
import musicianReducer from './musician/musician.reducer';
import songReducer from './song/song.reducer';
import growlMessages from './growl/growl.reducer';

const rootReducer = combineReducers({
    growlMessages,
    auth: authReducer,
    musician: musicianReducer,
    song: persistReducer({
        key: 'song',
        storage: storage,
        blacklist: ['songs']
    }, songReducer),
    band: persistReducer({
        key: 'band',
        storage: storage,
        blacklist: ['bands']
    }, bandReducer)
    
});

export default rootReducer;