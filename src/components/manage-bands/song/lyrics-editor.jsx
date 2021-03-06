import { Editor } from "primereact/editor";
import { QuillDeltaToHtmlConverter as Converter } from 'quill-delta-to-html';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showMessage } from '../../../redux/growl/growl.actions';
import { selectSong } from '../../../redux/song/song.actions';
import { selectSelectedSong } from '../../../redux/song/song.selector';
import songService from '../../../services/SongService.js';


const header = (
    <div className="ql-toolbar">
        <span className="ql-formats">
            <select className="ql-size" aria-label="Size" />
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


export const LyricsEditor = ({ song, selectSong, showMessage }) => {
    const [editorState, setEditorState] = useState({});
    const [editorText, setEditorText] = useState(new Converter(song?.lyrics?.ops).convert() || '');

    const save = () => {
        songService.update(song.id, { ...song, lyrics: { ops: editorState.ops } })
            .then((song) => {
                selectSong(song);
                setEditorText(new Converter(song?.lyrics?.ops).convert());
                showMessage({ severity: 'success', summary: 'Success', detail: 'Lyrics edition succeded' });
            })
            .catch(() => showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update lyrics" }));
    }

    return (
        <div>
            <Editor style={{ height: '41vh' }} value={editorText} headerTemplate={header} onTextChange={(e) => setEditorState(e.source.compose(e.delta))} />
            <div className="spacer-mini" />
            <div className="d-flex flex-row justify-content-start">
                <button className="btn btn-secondary" style={{ width: '100px' }} onClick={save}>Save</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(LyricsEditor)
