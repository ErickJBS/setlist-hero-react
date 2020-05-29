import React, { useState } from 'react'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {Editor} from "primereact/editor";
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { selectSelectedSong } from '../../../redux/song/song.selector';



export const EditorComponent = ({song, band}) => {
    const [editorState, setEditorState] = useState(song.lyrics);
    return (
        <div>
            <Editor value={editorState} onTextChange={(e)=> setEditorState(e.htmlValue)}/>
            <button className="btn btn-outline-danger" onClick={e => console.log(editorState)}>Log html value</button>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    band : selectSelectedBand,
    song: selectSelectedSong
})


export default connect(mapStateToProps)(EditorComponent)
