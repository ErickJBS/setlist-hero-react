import MusicianActionTypes from './musician.types';

const {FETCH_MUSICIANS_FAILURE, FETCH_MUSICIANS_SUCCESS} = MusicianActionTypes;

const INITIAL_STATE = {
    musicians: [],
    error: {}
}

const musicianReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type){
        case FETCH_MUSICIANS_SUCCESS:
            return {
                ...state,
                musicians: payload
            }
        case FETCH_MUSICIANS_FAILURE:
            return {
                ...state,
                error:payload
            }
        default:
            return state;
    }
}

export default musicianReducer;