import React from 'react'
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../routing/PrivateRoute';
import ManageSongSheets from './manage-song-sheets';
import LyricsEditor from './lyrics-editor';
import ChordsEditor from './chords-editor';
const SongSheetsRouter = () => {
    return (
        <Switch>
            <PrivateRoute path="/bands/:id/songs/:songId/editor/sheet/:sheetName" />
            <PrivateRoute path="/bands/:id/songs/:songId/editor/sheet/new" />
            <PrivateRoute path="/bands/:id/songs/:songId/editor/chords" component={ChordsEditor} />
            <PrivateRoute path="/bands/:id/songs/:songId/editor/lyrics" component={LyricsEditor} />
            <PrivateRoute path="/bands/:id/songs/:songId" component={ManageSongSheets} />
        </Switch>
    )
}

export default SongSheetsRouter;