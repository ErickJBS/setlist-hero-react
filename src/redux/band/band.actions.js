import BandActionTypes from './band.types';

const {FETCH_BANDS_SUCCESS, FETCH_BANDS_FAILURE, SELECT_BAND, UPDATE_SELECTED_BAND} = BandActionTypes;

export const fetchBandsSuccess = (bands) => ({
    type: FETCH_BANDS_SUCCESS,
    payload: bands
});

export const fetchBandsFailure = (error) => ({
    type: FETCH_BANDS_FAILURE,
    payload: error
});

export const selectBand = (band) => ({
    type: SELECT_BAND,
    payload: band
});

export const updateSelectedBand = (band) => ({
    type:UPDATE_SELECTED_BAND,
    payload: band
})