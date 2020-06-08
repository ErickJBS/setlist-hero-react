import EventActionsTypes from './events.types';

const {FETCH_EVENTS, SELECT_EVENT} = EventActionsTypes;

export const fetchEvents = events => ({
    type: FETCH_EVENTS,
    payload: events
})

export const selectEvent = event => ({
    type: SELECT_EVENT,
    payload: event
})