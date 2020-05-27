import BandActionTypes from './band.types';

const {FETCH_BANDS_SUCCESS, FETCH_BANDS_FAILURE, SELECT_BAND} = BandActionTypes;

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