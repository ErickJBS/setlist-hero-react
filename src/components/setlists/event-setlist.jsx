import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/Modal';
import { selectSelectedEvent } from '../../redux/event/events.selector';
import { selectEvent } from '../../redux/event/events.actions';
import songService from '../../services/SongService';
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import { showMessage } from '../../redux/growl/growl.actions';
import Button from 'react-bootstrap/Button';
import { InputText } from 'primereact/inputtext';
import AddSet from './add-set';
import ModifySet from './modify-set';
import DeleteSet from './delete-set';


const CustomHeader = ({
    setGlobalFilter,
    setIsAddSetDialogDisplaying,
    setIsModifySetDialogDisplaying,
    setIsRemoveSetDialogDisplaying
}) => (
        <div style={{ paddingTop: '2vh' }}>
            <div className="d-flex flex-row justify-content-start">
                <div style={{ paddingBottom: '1vh', marginRight: '1vw' }}>
                    <Button
                        variant="secondary"
                        onClick={() => setIsAddSetDialogDisplaying(true)}
                    >
                        <span className="text-light">
                            <i className="fas fa-plus-square" />{' '}
                        Add set
                    </span>
                    </Button>
                </div>
                <div style={{ paddingBottom: '1vh', marginRight: '1vw' }}>
                    <Button
                        variant="secondary"
                        onClick={() => setIsModifySetDialogDisplaying(true)}
                    >
                        <span className="text-light">
                            <i className="fas fa-edit" />{' '}
                        Modify Set
                    </span>
                    </Button>
                </div>
                <div>
                    <Button
                        variant="danger"
                        onClick={() => setIsRemoveSetDialogDisplaying(true)}
                    >
                        <span className="text-light">
                            <i className="far fa-trash-alt"></i>{' '}
                        Delete set
                    </span>
                    </Button>
                </div>
                <div style={{ paddingLeft: '37vw' }}>
                    <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
                </div>
            </div>
        </div>
    );

const EventSetlist = ({ event, showMessage }) => {
    const [allSongs, setAllSongs] = useState([]);
    const [setlistItems, setSetlistItems] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isAddSetDialogDisplaying, setIsAddSetDialogDisplaying] = useState(false);
    const [isModifySetDialogDisplaying, setIsModifySetDialogDisplaying] = useState(false);
    const [isRemoveSetDialogDisplaying, setIsRemoveSetDialogDisplaying] = useState(false);

    useEffect(() => {
        songService.getAll(event.band)
            .then(songs => {
                setAllSongs(
                    songs.map(song => {
                        return { label: song.name, value: song.id }
                    })
                );
            })
            .catch(error => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't fetch songs" });
            });
    }, []);

    useEffect(() => {
        event.setlist.length && setSetlistItems(
            event.setlist.map((set, index) => {
                return {
                    key: index,
                    data: {
                        name: set?.name,
                        detail: `Has ${set?.songs?.length || 0} songs`
                    },
                    children: set?.songs.map((song, songIndex) => ({
                        key: `${index}-${songIndex}`,
                        data: {
                            name: allSongs.find(element => element.value === song)?.label
                        }
                    }))
                }
            })
        );
    }, [allSongs, event.setlist]);

    const renderAddSetModal = (
        <Modal
            show={isAddSetDialogDisplaying}
            onHide={() => setIsAddSetDialogDisplaying(false)}
            dialogClassName="modal-dialog-centered"
            aria-labelledby="modal-title"
            onExiting={() => setIsAddSetDialogDisplaying(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    Add set
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddSet callback={() => setIsAddSetDialogDisplaying(false)} songs={allSongs} />
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )

    const renderModifySetModal = (
        <Modal
            show={isModifySetDialogDisplaying}
            onHide={() => setIsModifySetDialogDisplaying(false)}
            dialogClassName="modal-dialog-centered"
            aria-labelledby="modal-title"
            onExiting={() => setIsModifySetDialogDisplaying(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    Modify set
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModifySet callback={() => setIsModifySetDialogDisplaying(false)} songs={allSongs} />
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )

    const renderRemoveSet = (
        <Modal
            show={isRemoveSetDialogDisplaying}
            onHide={() => setIsRemoveSetDialogDisplaying(false)}
            dialogClassName="modal-dialog-centered"
            aria-labelledby="modal-title"
            onExiting={() => setIsRemoveSetDialogDisplaying(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    Remove set
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeleteSet callback={() => setIsRemoveSetDialogDisplaying(false)}/>
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )

    return (
        <>
            {renderAddSetModal}
            {renderModifySetModal}
            {renderRemoveSet}
            <TreeTable
                scrollable scrollHeight="40vh"
                value={setlistItems}
                className="animated faster fadeIn"
                globalFilter={globalFilter}
                header={<CustomHeader
                    setIsRemoveSetDialogDisplaying={setIsRemoveSetDialogDisplaying}
                    setIsModifySetDialogDisplaying={setIsModifySetDialogDisplaying}
                    setIsAddSetDialogDisplaying={setIsAddSetDialogDisplaying}
                    setGlobalFilter={setGlobalFilter} />}
            >
                <Column field="name" header="Name" expander />
                <Column field="detail" header="Detail" />
            </TreeTable>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    event: selectSelectedEvent
})

const mapDispatchToProps = dispatch => ({
    selectEvent: event => dispatch(selectEvent(event)),
    showMessage: message => dispatch(showMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventSetlist)
