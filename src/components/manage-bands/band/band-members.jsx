import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { Dropdown } from 'primereact/dropdown';
import { connect } from 'react-redux';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { selectMusicians } from '../../../redux/musician/musician.selector';
import { fetchMusiciansSuccess, fetchMusiciansFailure } from '../../../redux/musician/musician.actions';
import { createStructuredSelector } from 'reselect';
import TableHeader from '../../table-header';
import AddBandMember from './add-band-member';
import musicianService from '../../../services/MusicianService';
import options from './instruments-options';

const BandMembers = ({ musicians, fetchMusicians, band, fetchFailure }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);
    const [isConfirmDialogDisplaying, setIsConfirmDialogDisplaying] = useState(false);
    const [isUpdateDialogDisplaying, setIsUpdateDialogDisplaying] = useState(false);
    const [musicianToBeModified, setMusicianToBeModified] = useState(null);
    const [selectedInstrument, setSelectedInstrument] = useState('');
    let memberModified = useRef(null);

    useEffect(() => {
        musicianService.getAll(band.id)
            .then(results => {
                const newMusicians = results.map(
                    result => {
                        const { band, instrument, email, id, user } = result;
                        return {
                            band,
                            instrument: [instrument[0].toUpperCase(), instrument.slice(1)].join(''),
                            email,
                            id,
                            status: user ? 'Active' : 'Pending',
                            username: user?.username,
                            name: user?.displayName
                        };
                    }
                );

                fetchMusicians(newMusicians);
            })
            .catch(error => {
                fetchFailure(error);
            })
    }, []);

    const handleUpdate = () => {
        musicianService.update(musicianToBeModified.id, { instrument: selectedInstrument })
            .then(e => {
                fetchMusicians(musicians.map(
                    musician => {
                        const { band, email, id, status, username, name } = musician;
                        if (musicianToBeModified.id === id)
                            return {
                                band,
                                email,
                                id,
                                status,
                                username,
                                name,
                                instrument: [selectedInstrument[0].toUpperCase(), selectedInstrument.slice(1)].join('')
                            }
                        else return musician;

                    }));
                memberModified.current.show({ severity: 'success', summary: 'Success', detail: 'Member edited!' });
                setIsUpdateDialogDisplaying(false);
                setMusicianToBeModified(null);
            })
            .catch(() => {
                memberModified.current.show({ severity: 'error', summary: 'Error Message', detail: "Couldn't edit member" });
                setIsUpdateDialogDisplaying(false);
            })
    }

    const handleDelete = () => {
        musicianService.delete(musicianToBeModified.id)
            .then(e => {
                fetchMusicians(musicians.filter(musician => musician.id !== musicianToBeModified.id));
                setMusicianToBeModified(null);
                memberModified.current.show({ severity: 'success', summary: 'Success', detail: 'Member deleted' });
                setIsConfirmDialogDisplaying(false)
            })
            .catch(() => {
                memberModified.current.show({ severity: 'error', summary: 'Error Message', detail: "Couldn't delete member" });
                setIsConfirmDialogDisplaying(false)
            });
    }

    const deleteBodyTemplate = (rowData) => {
        const handleClick = (data) => {
            setMusicianToBeModified(data);
            setIsConfirmDialogDisplaying(true);
        };
        return (
            <Button type="button" icon="pi pi-trash" className="p-button-secondary" onClick={() => handleClick(rowData)}></Button>
        );
    };

    const editBodyTemplate = (rowData) => {
        const handleClick = (data) => {
            setMusicianToBeModified(data);
            setIsUpdateDialogDisplaying(true);
        };
        return (
            <Button type="button" icon="pi pi-pencil" className="p-button-secondary" onClick={() => handleClick(rowData)}></Button>
        );
    };

    const renderDeleteModal = (
        <Modal show={isConfirmDialogDisplaying} onHide={() => setIsConfirmDialogDisplaying(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`You are about to delete ${musicianToBeModified?.username} are you sure?`}
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

    const renderUpdateModal = (
        <Modal show={isUpdateDialogDisplaying} onHide={() => setIsUpdateDialogDisplaying(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <p><strong>{`You can only edit ${musicianToBeModified?.username}'s instrument`}</strong></p>
                    <div className="spacer-mini" />
                    <div className="container">
                        <div className="row">
                            <label htmlFor="member-instrument" className="col-sm-3 col-form-label h6">Instrument</label>
                            <div class="col-sm-9">
                                <Dropdown options={options} value={selectedInstrument} onChange={e => setSelectedInstrument(e.value)} placeholder="Select an instrument" />
                            </div>
                        </div>
                    </div>
                </>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleUpdate}>
                    Edit
                </button>
                <button className="btn btn-secondary" onClick={() => setIsUpdateDialogDisplaying(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            <Growl ref={memberModified} position="topright"></Growl>
            {renderDeleteModal}
            {renderUpdateModal}
            <Modal
                show={isDialogDisplaying}
                onHide={() => setIsDialogDisplaying(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-title"
                centered
                onExiting={() => setIsDialogDisplaying(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">
                        Add band member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBandMember callback={() => setIsDialogDisplaying(false)} />
                </Modal.Body>
            </Modal>
            <DataTable id="band-members-table" value={musicians}
                className="animated faster fadeIn "
                resizableColumns={true}
                header={
                    <TableHeader
                        buttonText="Add member"
                        isDialogDisplaying={isDialogDisplaying}
                        setGlobalFilte={setGlobalFilter}
                        setIsDialogDisplaying={setIsDialogDisplaying} />
                }
                scrollable scrollHeight="315px"
                globalFilter={globalFilter} sortField="name"
                selectionMode="single">
                <Column field="name" header="Name" sortable />
                <Column field="username" header="Username" sortable style={{ width: '13%' }} />
                <Column field="email" header="Email" sortable />
                <Column field="instrument" header="Instrument" sortable style={{ width: '13%' }} />
                <Column field="status" header="Status" sortable />
                <Column body={editBodyTemplate} headerStyle={{ width: '4em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                <Column body={deleteBodyTemplate} headerStyle={{ width: '4em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    musicians: selectMusicians,
    band: selectSelectedBand
});

const mapDispatchTopProps = dispatch => ({
    fetchMusicians: musicians => dispatch(fetchMusiciansSuccess(musicians)),
    fetchFailure: error => dispatch(fetchMusiciansFailure(error))
})

export default connect(
    mapStateToProps,
    mapDispatchTopProps
)(BandMembers);