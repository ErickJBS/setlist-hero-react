import EventActionTypes from './events.types';

const {FETCH_EVENTS, SELECT_EVENT} = EventActionTypes;

const INITIAL_STATE = {
    events: [],
    selectecEvent: {}
}

const eventReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        case FETCH_EVENTS:
            return {
                ...state,
                events: payload
            }
        case SELECT_EVENT:
            return {
                ...state,
                selectecEvent: payload
            }
        default:
            return state;
    }
}

export default eventReducer;