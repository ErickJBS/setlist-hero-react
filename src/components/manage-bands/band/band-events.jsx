import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { fetchEvents } from '../../../redux/event/events.actions';
import { selectEvents } from '../../../redux/event/events.selector';
import { showMessage } from '../../../redux/growl/growl.actions';
import eventService from '../../../services/EventService';
import TableHeader from '../../table-header';
import CreateEvent from './create-event';
import EditEvent from './edit-event';

const BandEvents = ({ band, events, fetchEvents, showMessage }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);
    const [isConfirmDialogDisplaying, setIsConfirmDialogDisplaying] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(null);
    const [isEditDialogDisplaying, setIsEditDialogDisplaying] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);

    useEffect(() => {
        eventService.eventsByBand(band.id)
            .then(events => {
                const newEvents = events.map(
                    event => ({
                        ...event,
                        tags: event.tags.join(', '),
                        date: new Date(event.date).toLocaleDateString()
                    }));
                fetchEvents(newEvents);
            })
            .catch(error => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't fetch events" });
            });
    }, []);


    const handleDelete = () => {
        eventService.delete(eventToBeDeleted.id)
            .then(() => {
                showMessage({ severity: 'success', summary: 'Success', detail: 'Event deleted' });
                setIsConfirmDialogDisplaying(false)
                fetchEvents(events.filter(event => event.id !== eventToBeDeleted.id));
                setEventToBeDeleted(null);
            })
            .catch(() => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't delete event" });
                setIsConfirmDialogDisplaying(false)
            });
    }

    const deleteBodyTemplate = (rowData) => {
        const handleClick = (data) => {
            setEventToBeDeleted(data);
            setIsConfirmDialogDisplaying(true);
        };
        return (
            <Button
                type="button"
                icon="pi pi-trash"
                className="p-button-secondary"
                onClick={() => handleClick(rowData)} />
        );
    };

    const editBodyTemplate = (rowData) => {
        const handleClick = (data) => {
            setEventToEdit(data);
            setIsEditDialogDisplaying(true);
        };
        return (
            <Button
                type="button"
                icon="pi pi-pencil"
                className="p-button-secondary"
                onClick={() => handleClick(rowData)} />
        );
    };

    const renderUpdateModal = (
        <Modal
            show={isEditDialogDisplaying}
            onHide={() => setIsEditDialogDisplaying(false)}
            dialogClassName="modal-dialog-centered"
            aria-labelledby="modal-title"
            onExiting={() => setIsEditDialogDisplaying(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    Edit event
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditEvent
                    event={eventToEdit}
                    callback={() => setIsEditDialogDisplaying(false)} />
            </Modal.Body>
            <Modal.Footer />
        </Modal>)

    const renderDeleteModal = (
        <Modal show={isConfirmDialogDisplaying} onHide={() => setIsConfirmDialogDisplaying(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`You are about to delete ${eventToBeDeleted?.name} are you sure?`}
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
            {renderDeleteModal}
            {renderUpdateModal}
            <Modal

                show={isDialogDisplaying}
                onHide={() => setIsDialogDisplaying(false)}
                dialogClassName="modal-dialog-centered"
                aria-labelledby="modal-title"
                onExiting={() => setIsDialogDisplaying(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">
                        Add event
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateEvent
                        callback={() => setIsDialogDisplaying(false)} />
                </Modal.Body>
            </Modal>
            <DataTable className="animated faster fadeIn"
                header={
                    <TableHeader
                        buttonText="Add event"
                        isDialogDisplaying={isDialogDisplaying}
                        setGlobalFilter={setGlobalFilter}
                        setIsDialogDisplaying={setIsDialogDisplaying} />
                }
                scrollable scrollHeight="315px"
                value={events}
                globalFilter={globalFilter} sortField="name"
                selectionMode="single">
                <Column field="name" header="Name" sortable />
                <Column field="date" header="Date" sortable style={{ width: '10%', textAlign: 'center' }} />
                <Column field="location" header="Location" sortable />
                <Column field="designer" header="Designer" sortable />
                <Column field="tags" header="Tags" sortable />
                <Column body={editBodyTemplate} headerStyle={{ width: '4em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                <Column body={deleteBodyTemplate} headerStyle={{ width: '4em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    events: selectEvents,
    band: selectSelectedBand
});

const mapDispatchTopProps = dispatch => ({
    showMessage: message => dispatch(showMessage(message)),
    fetchEvents: events => dispatch(fetchEvents(events))
})

export default connect(
    mapStateToProps,
    mapDispatchTopProps
)(BandEvents);