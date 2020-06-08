import {createSelector} from 'reselect';

export const bands = state => state.band

export const selectBands = createSelector(
    [bands],
    bandState => bandState.bands
)

export const selectSelectedBand = createSelector(
    [bands],
    bandState => bandState.selectedBand
);

