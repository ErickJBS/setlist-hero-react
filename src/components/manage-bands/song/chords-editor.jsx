import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {useLocation, useParams} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Editor } from "primereact/editor";
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { selectSelectedSong } from '../../../redux/song/song.selector';
import {QuillDeltaToHtmlConverter as Converter} from 'quill-delta-to-html';
import songService from '../../../services/SongService.js';
import {showMessage} from '../../../redux/growl/growl.actions';
import { selectSong } from '../../../redux/song/song.actions';

const header = (
    <div className="ql-toolbar">
        <span className="ql-formats">
            <select className="ql-size" aria-label="Size"  />
        </span>
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>{' '}
            <button className="ql-italic" aria-label="Italic"></button>{' '}
            <button className="ql-underline" aria-label="Underline"></button>{' '}
        </span>
        <span className="ql-formats">
            <select className="ql-color" aria-label="Font color" />{' '}
            <select className="ql-background" />{' '}
        </span>
    </div>

);


export const ChordsEditor = ({ song }) => {
    const [editorState, setEditorState] = useState({});

    const save = () => {
        songService.update(song.id, {...song,tags: song.tags.split(', ') , chords:{ops: editorState.ops}})
        .then(song => {
            selectSong({ ...song, tags: song.tags.join(', ') });
            showMessage({ severity: 'success', summary: 'Success', detail: 'Lyrics edition succeded' });
        });
    }

    return (
        <div>
            <Editor style={{ height: '300px' }} value={new Converter(song?.chords?.ops).convert() || ''} headerTemplate={header} onTextChange={(e) =>setEditorState(e.source.compose(e.delta))} />
            <div className="spacer-mini"/>
            <div className="d-flex flex-row justify-content-start">
                <button className="btn btn-secondary" style={{width:'100px'}}onClick={save}>Save</button>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    song: selectSelectedSong
})

const mapDispatchToProps = dispatch => ({
    selectSong: song => dispatch(selectSong(song)),
    showMessage: message => dispatch(showMessage(message))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChordsEditor)
