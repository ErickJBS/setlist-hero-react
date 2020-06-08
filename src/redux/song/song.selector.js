import {createSelector} from 'reselect';

export const songs = state => state.song;

export const selectSelectedSong = createSelector(
    [songs],
    songsState => songsState.song
)

export const selectSongs = createSelector(
    [songs],
    songsState => songsState.songs
)