import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { selectBands } from '../../../redux/band/band.selector';
import { createStructuredSelector } from 'reselect';
import TableHeader from '../../table-header';

const BandEvents = ({ bands, selectBand }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);

    const createBandCallback = () => {
        setIsDialogDisplaying(false);
    }

    return (
        <>

            <Modal
                size="xl"
                show={isDialogDisplaying}
                onHide={() => setIsDialogDisplaying(false)}
                dialogClassName="modal-dialog-centered"
                aria-labelledby="modal-title"
                onExiting={() => setIsDialogDisplaying(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">
                        Add member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="spacer" />
                </Modal.Body>
            </Modal>
            <DataTable className="animated faster fadeIn"
                header={
                    <TableHeader
                        buttonText="Add event"
                        isDialogDisplaying={isDialogDisplaying}
                        setGlobalFilte={setGlobalFilter}
                        setIsDialogDisplaying={setIsDialogDisplaying} />
                }
                scrollable scrollHeight="315px"
                globalFilter={globalFilter} sortField="name"
                selectionMode="single">
                <Column field="name" header="Name" sortable />
                <Column field="date" header="Date" sortable />
                <Column field="location" header="Location" sortable />
                <Column field="designer" header="Designer" sortable />
                <Column field="tags" header="Tags" sortable />
            </DataTable>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    bands: selectBands
});

export default connect(
    mapStateToProps
)(BandEvents);