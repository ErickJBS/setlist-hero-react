import {createSelector} from 'reselect';

export const musicians = state => state.musician

export const selectMusicians = createSelector(
    [musicians],
    musiciansState => musiciansState.musicians
)