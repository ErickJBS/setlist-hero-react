import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { createStructuredSelector } from 'reselect';
import { Chips } from 'primereact/chips';
import { Growl } from 'primereact/growl';
import { selectSongs } from '../../../redux/song/song.selector';
import { fetchSongs } from '../../../redux/song/song.actions';
import songService from '../../../services/SongService';

const AddSong = ({ callback, selectedBand, songs, fetchSongs }) => {
    const [name, setName] = useState('');
    const [tempo, setTempo] = useState(null);
    const [tags, setTags] = useState([]);
    let songMessage = useRef(null);
    let songMessageFailed = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const song = { band: selectedBand.id, name, tempo, tags };
        songService.create(song)
            .then(song => {
                setTimeout(callback, 1000);
                songMessage.current.show({ life: 650, severity: 'success', summary: 'Success', detail: 'Song added' });
                return { ...song, tags: song.tags.join(', ') };
            })
            .then(newSong => fetchSongs(songs.concat(newSong)))
            .catch(e => {
                songMessageFailed.current.show({ severity: 'error', summary: 'Error Message', detail: "Couldn't add song" })
            });
    }
    return (
        <>
            <Growl ref={songMessage} position="topright"></Growl>
            <Growl ref={songMessageFailed} position="topright"></Growl>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="song-name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input  onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="song-name" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="song-tempo" className="col-sm-2 col-form-label">Tempo</label>
                    <div className="col-sm-10">
                        <input  onChange={(e) => setTempo(e.target.value)} type="number" className="form-control" id="song-tempo" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="song-tags" className="col-sm-2 col-form-label">Tags</label>
                    <div className="col-sm-10">
                        <Chips value={tags} onChange={(e) => setTags(e.value)} separator=','></Chips>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6" />
                    <div className="col" style={{ paddingLeft: '39px' }}>
                        <button type="submit" className="btn btn-success mb-2" >Create song</button>{' '}
                        <button type="button" className="btn btn-secondary mb-2" onClick={callback}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    songs: selectSongs,
    selectedBand: selectSelectedBand
});

const mapDispatchToProps = dispatch => ({
    fetchSongs: songs => dispatch(fetchSongs(songs))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSong);