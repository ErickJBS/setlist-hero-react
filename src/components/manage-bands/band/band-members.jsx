import React, { useState} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CreateBand from './create-band';
import { connect } from 'react-redux';
import { selectBands } from '../../redux/band/band.selector';
import { createStructuredSelector } from 'reselect';

const ManageBandsBody = ({bands, selectBand }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const history = useHistory();


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
                    <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
                </div>
            </div>
        </div>
    )

    const createBandCallback = () => {
        setIsDialogDisplaying(false);
    }
    const chooseBand = e => {
        selectBand(e.value);
        history.push(`/bands/${e.value.id}`);
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
                        Create a band
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateBand callback={createBandCallback} />
                    <div className="spacer" />
                </Modal.Body>
            </Modal>
            <DataTable header={tableHeader()} 
                globalFilter={globalFilter} sortField="name"
                onRowClick={e => console.log(e.data)}
                selectionMode="single"
                selection={selectedColumn} onSelectionChange={chooseBand}>
                <Column field="name" header="Name" sortable />
                <Column style={{ width: '50%' }} field="description" header="Description" sortable />
                <Column style={{ width: '25%' }} field="genres" header="Genres" sortable />

            </DataTable>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    bands: selectBands
});

export default connect(
    mapStateToProps
)(ManageBandsBody);