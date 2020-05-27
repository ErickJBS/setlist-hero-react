import React, { useState} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CreateBand from './create-band';
import { connect } from 'react-redux';
import { fetchBandsSuccess, fetchBandsFailure, selectBand } from '../../redux/band/band.actions';
import { selectBands } from '../../redux/band/band.selector';
import { createStructuredSelector } from 'reselect';
import TableHeader from '../table-header';
const ManageBandsBody = ({bands, selectBand }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const history = useHistory();

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
            <DataTable  
                header={
                    <TableHeader
                        isDialogDisplaying={isDialogDisplaying}
                        setGlobalFilte={setGlobalFilter}
                        setIsDialogDisplaying={setIsDialogDisplaying} />
                }
                value={bands} scrollable scrollHeight="315px"
                globalFilter={globalFilter} sortField="name"
                selectionMode="single" sortOrder={1}
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

const mapDispatchToProps = dispatch => ({
    fetchBandsSuccess: bands => dispatch(fetchBandsSuccess(bands)),
    fetchBandsFailure: error => dispatch(fetchBandsFailure(error)),
    selectBand: band => dispatch(selectBand(band))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageBandsBody);