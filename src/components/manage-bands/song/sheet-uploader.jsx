import React, { useState } from 'react'
import { connect } from 'react-redux';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import environment from 'environment';
import options from './sheets-options';
import { showMessage } from '../../../redux/growl/growl.actions';
import { createStructuredSelector } from 'reselect';
import { selectSelectedSong } from '../../../redux/song/song.selector';
import { selectSong } from '../../../redux/song/song.actions';
import songService from '../../../services/SongService';

const baseUrl = environment.api;

const SheetUploader = ({ callback, showMessage, song, selectSong }) => {

    const [instrument, setInstrument] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateSheets = song.sheets.length ? song.sheets.map( sheet => {
            if (sheet.instrument === instrument) return {instrument, content: imageUrl};
            else return sheet;
        }) : [{instrument, content: imageUrl}];
        const updateSong = {
            ...song,
            sheets: updateSheets
        };
        songService.update(song.id, updateSong)
        .then(song => {
            selectSong(song)
            showMessage({ severity: 'success', summary: 'Success', detail: 'Sheet added!' });
            callback();
        })
        .catch (() => showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't add sheet" }));
    }

    const onUpload = (e) => {
        showMessage({ severity: 'success', summary: 'Success', detail: 'File Uploaded' });
        const response = JSON.parse(e.xhr.response);
        setImageUrl(response.downloadUrl);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label htmlFor="upload-sheet" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <FileUpload
                        name="data"
                        id="upload-sheet"
                        multiple={false}
                        auto
                        url={`${baseUrl}/storage/upload/pdf`}
                        onUpload={onUpload}
                        accept="application/pdf"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="sheet-type" className="col-sm-2 col-form-label">Type</label>
                <div className="col-sm-10">
                    <Dropdown
                        id="sheet-type" value={instrument}
                        options={options}
                        onChange={e => setInstrument(e.value)}
                        style={{ width: '12em' }}
                        placeholder="Select sheet type" />
                    
                </div>
            </div>
            <small>Sheet types are only limited by one by instrument</small>
            <div className="spacer-mini"/>
            <div className="form-group row">
                <div className="col-6" />
                <div className="col" style={{ paddingLeft: '65px' }}>
                    <button type="submit" className="btn btn-success mb-2" >Add sheet</button>{' '}
                    <button type="button" className="btn btn-secondary mb-2" onClick={callback}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = createStructuredSelector({
    song: selectSelectedSong
});

const mapDispatchToProps = dispatch => ({
    selectSong: song => dispatch(selectSong(song)),
    showMessage: message => dispatch(showMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(SheetUploader)
