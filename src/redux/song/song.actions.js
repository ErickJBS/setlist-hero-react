import SongActionsTypes from './song.types';

const {FETCH_SONGS, SELECT_SONG} = SongActionsTypes;

export const fetchSongs = (songs) => ({
    type: FETCH_SONGS,
    payload: songs
});

export const selectSong = (song) => ({
    type: SELECT_SONG,
    payload: song
})