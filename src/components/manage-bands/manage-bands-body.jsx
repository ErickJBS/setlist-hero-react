import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CreateBand from './create-band';

const ManageBandsBody = () => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);

    
    const tableHeader = () => (
        <div className='container-fluid' style={{ paddingTop: '15px' }}>
            <div className="row align-content-center">
                <div className="col-lg-2" style={{ paddingBottom: '10px' }}>
                    <Button
                        active={isDialogDisplaying}
                        variant="success"
                        onClick={() => setIsDialogDisplaying(true)}>
                        <span className="text-light">
                            <i className="fas fa-plus-square" />
                            {' Add Band'}
                        </span>
                    </Button>
                </div>
                <div style={{ paddingLeft: '750px' }} className="col">
                    <InputText type="search" placeholder="Search" />
                </div>
            </div>
        </div>
    )
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
                        Create a band
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateBand/>
                    <div className="spacer" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsDialogDisplaying(false)}>Close</Button>
                    <Button variant="success" onClick={() => setIsDialogDisplaying(false)}>Save</Button>
                </Modal.Footer>
            </Modal>
            <DataTable header={tableHeader()} responsive globalFilter={globalFilter} sortField="name"
                value={[{ vin: 'a', year: 'a' }]}>
                <Column field="name" header="Name" sortable />
                <Column field="genres" header="Description" sortable />
                <Column field="description" header="Genres" sortable />
                <Column field="type" header="Type" sortable />
            </DataTable>
        </>
    )
};

export default ManageBandsBody;