import React from 'react'
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../routing/PrivateRoute';
import ManageSongSheets from './manage-song-sheets';
import EditorComponent from './editor-component';
const SongSheetsRouter = () => {
    return (
        <Switch>
            <PrivateRoute path="/bands/:id/songs/:songId/editor/sheet/:sheetName" />
            <PrivateRoute path="/bands/:id/songs/:songId/editor/sheet/new" />
            <PrivateRoute path="/bands/:id/songs/:songId/editor/lyrics" component={EditorComponent} />
            <PrivateRoute path="/bands/:id/songs/:songId" component={ManageSongSheets} />
        </Switch>
    )
}

export default SongSheetsRouter;