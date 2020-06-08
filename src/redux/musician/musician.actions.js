import MusicianActionTypes from './musician.types';

const {FETCH_MUSICIANS_FAILURE, FETCH_MUSICIANS_SUCCESS} = MusicianActionTypes;

export const fetchMusiciansSuccess = (musicians) => ({
    type: FETCH_MUSICIANS_SUCCESS,
    payload: musicians
});

export const fetchMusiciansFailure = (error) => ({
    type: FETCH_MUSICIANS_FAILURE,
    payload: error
});