import {createSelector} from 'reselect';

export const events = state => state.event;

export const  selectEvents = createSelector(
    [events],
    eventsState => eventsState.events
)

export const  selectSelectedEvent = createSelector(
    [events],
    eventsState => eventsState.event
)