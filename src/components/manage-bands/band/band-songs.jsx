import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { selectBands } from '../../../redux/band/band.selector';
import { createStructuredSelector } from 'reselect';
import TableHeader from '../../table-header';
import AddSong from './add-song';

const BandSongs = ({ bands, selectBand }) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isDialogDisplaying, setIsDialogDisplaying] = useState(false);

    const createBandCallback = () => {
        setIsDialogDisplaying(false);
    }

    return (
        <>

            <Modal
                size="lg"
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
                    <AddSong callback={setIsDialogDisplaying}/>
                </Modal.Body>
            </Modal>
            <DataTable className="animated faster fadeIn"
                header={
                    <TableHeader
                        buttonText="Add song"
                        isDialogDisplaying={isDialogDisplaying}
                        setGlobalFilte={setGlobalFilter}
                        setIsDialogDisplaying={setIsDialogDisplaying} />
                }
                scrollable scrollHeight="315px"
                globalFilter={globalFilter} sortField="name"
                selectionMode="single">
                <Column field="name" header="Name" sortable />
                <Column field="tags" header="Tags" sortable />
                <Column field="tempo" header="Tempo" sortable />
            </DataTable>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    bands: selectBands
});

export default connect(
    mapStateToProps
)(BandSongs);