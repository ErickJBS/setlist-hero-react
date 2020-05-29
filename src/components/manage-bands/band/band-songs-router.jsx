import React from 'react'
import BandSongs from './band-songs';
import ManageSongSheets from '../song/manage-song-sheets';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../routing/PrivateRoute';
import SongSheetsRouter from '../song/song-sheets-router';

const BandSongsRouter = () => {
    return (
        <Switch>
            <PrivateRoute path="/bands/:id/songs/:songId" component={SongSheetsRouter} />
            <PrivateRoute path="/bands/:id/songs" component={BandSongs}/>
        </Switch>
    )
}

export default BandSongsRouter;