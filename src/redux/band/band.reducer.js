import BandActionTypes from './band.types';

const {FETCH_BANDS_SUCCESS, FETCH_BANDS_FAILURE,SELECT_BAND} = BandActionTypes;


const INITIAL_STATE = {
    bands: [],
    selectedBand: null,
    error: {}
}

const bandReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCH_BANDS_SUCCESS:
            return {
                ...state,
                bands: payload
            }
        case FETCH_BANDS_FAILURE:
            return {
                ...state,
                error: payload
            }
        case SELECT_BAND:
            return {
                ...state,
                selectedBand: payload
            }
        default:
            return state;
    }
}

export default bandReducer;