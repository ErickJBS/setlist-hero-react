import SongActionsTypes from './song.types';

const {FETCH_SONGS, SELECT_SONG} = SongActionsTypes;

const INITIAL_STATE = {
    songs: [],
    song: {}
}

const songReducer = (state = INITIAL_STATE, action) => {
    const {type,payload} = action;
    switch(type){
        case FETCH_SONGS:
            return {
                ...state,
                songs: payload
            }
        case SELECT_SONG:
            return {
                ...state,
                song: payload
            }
        default:
            return state;
    }
}

export default songReducer;