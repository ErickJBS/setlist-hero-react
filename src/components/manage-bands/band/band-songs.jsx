import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { selectSongs } from '../../../redux/song/song.selector';
import { fetchSongs, selectSong } from '../../../redux/song/song.actions';
import { createStructuredSelector } from 'reselect';
import { Growl } from 'primereact/growl';
import TableHeader from '../../table-header';
import AddSong from './add-song';
import songService from '../../../services/SongService';

const BandSongs = ({ songs, band, fetchSongs, selectSong }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);
    const [isConfirmDialogDisplaying, setIsConfirmDialogDisplaying] = useState(false);
    const [songToBeDeleted, setSongToBeDeleted] = useState(null);
    let songModified = useRef(null);
    const history = useHistory();

    useEffect(() => {
        songService.getAll(band.id)
            .then(songs => {
                fetchSongs(
                    songs.map(song => ({ ...song, tags: song.tags.join(', ') }))
                );
            });
    }, []);

    const handleDelete = () => {
        songService.delete(songToBeDeleted.id)
            .then(() => {
                setSongToBeDeleted(null);
                songModified.current.show({ severity: 'success', summary: 'Success', detail: 'Member deleted' });
                setIsConfirmDialogDisplaying(false)
                fetchSongs(songs.filter(song => song.id !== songToBeDeleted.id));
            })
            .catch(() => {
                songModified.current.show({ severity: 'error', summary: 'Error Message', detail: "Couldn't delete member" });
                setIsConfirmDialogDisplaying(false)
            });
    }

    const deleteBodyTemplate = (rowData) => {
        const handleClick = (data) => {
            setSongToBeDeleted(data);
            setIsConfirmDialogDisplaying(true);
        };
        return (
            <Button type="button" icon="pi pi-trash" className="p-button-secondary" onClick={() => handleClick(rowData)}></Button>
        );
    };

    const editBodyTemplate = (rowData) => {
        const handleClick = (data) => {
            selectSong(data);
            history.push(`/bands/${band.id}/songs/${data.id}`);
        };
        return (
            <Button type="button" icon="pi pi-pencil" className="p-button-secondary" onClick={() => handleClick(rowData)}></Button>
        );
    };

    const renderDeleteModal = (
        <Modal show={isConfirmDialogDisplaying} onHide={() => setIsConfirmDialogDisplaying(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`You are about to delete ${songToBeDeleted?.name} are you sure?`}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                    </button>
                <button className="btn btn-secondary" onClick={() => setIsConfirmDialogDisplaying(false)}>
                    Close
                    </button>
            </Modal.Footer>
        </Modal>
    );


    return (
        <>
            <Growl ref={songModified} position="topright"></Growl>
            {renderDeleteModal}
            <Modal
                show={isDialogDisplaying}
                onHide={() => setIsDialogDisplaying(false)}
                dialogClassName="modal-dialog-centered"
                aria-labelledby="modal-title"
                onExiting={() => setIsDialogDisplaying(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">
                        Add song
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddSong callback={() => setIsDialogDisplaying(false)} />
                </Modal.Body>
            </Modal>
            <DataTable value={songs} className="animated faster fadeIn"
                header={
                    <TableHeader
                        buttonText="Add song"
                        isDialogDisplaying={isDialogDisplaying}
                        setGlobalFilte={setGlobalFilter}
                        setIsDialogDisplaying={setIsDialogDisplaying} />
                }
                scrollable scrollHeight="315px"
                globalFilter={globalFilter} sortField="name">
                <Column field="name" header="Name" sortable />
                <Column field="tags" header="Tags" sortable />
                <Column field="tempo" header="Tempo" sortable />
                <Column body={editBodyTemplate} headerStyle={{ width: '4em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                <Column body={deleteBodyTemplate} headerStyle={{ width: '4em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    band: selectSelectedBand,
    songs: selectSongs
});

const mapDispatchToProps = dispatch => ({
    selectSong: song => dispatch(selectSong(song)),
    fetchSongs: songs => dispatch(fetchSongs(songs))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BandSongs);