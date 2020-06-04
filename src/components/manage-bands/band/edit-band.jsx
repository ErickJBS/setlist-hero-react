import environment from 'environment';
import { FileUpload } from 'primereact/fileupload';
import { MultiSelect } from 'primereact/multiselect';
import React, { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selector';
import { fetchBandsSuccess, selectBand } from '../../../redux/band/band.actions';
import { selectBands, selectSelectedBand } from '../../../redux/band/band.selector';
import { showMessage } from '../../../redux/growl/growl.actions';
import bandService from '../../../services/BandService';
import selected from '../../multiselect-selected';
import genreItems from '../genre-items';

const baseUrl = environment.api;

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'update':
            return {
                action: 'update',
                message: `Are you sure you want to update ${payload}`
            }
        case 'mark_active':
            return {
                action: 'markActive',
                message: `You are about to mark ${payload} as active. Are you sure?`
            }
        case 'mark_inactive':
            return {
                action: 'markInactive',
                message: `You are about to mark ${payload} as inactive. Are you sure?`
            }
        default:
            throw new Error('wrong action type');
    }
}

const EditBand = ({ user, selectedBand, updateSelectedBand, fetchBandsSuccess, bands, showMessage }) => {
    const [genres, setGenres] = useState(selectedBand.genres.split(',').map(genre => genre.trim()));
    const [imageUrl, setImageUrl] = useState(selectedBand.logo);
    const [bandName, setBandName] = useState(selectedBand.name);
    const [bandDescription, setBandDescription] = useState(selectedBand.description);
    const [isBandActive, setIsBandActive] = useState(selectedBand.active === 'Active');
    const [isConfirmDialogDisplaying, setIsConfirmDialogDisplaying] = useState(false);


    const [actionState, dispatch] = useReducer(reducer, { action: {}, message: '' });

    const onUpload = (e) => {
        showMessage({ severity: 'success', summary: 'Success', detail: 'File Uploaded' });
        const response = JSON.parse(e.xhr.response);
        setImageUrl(response.downloadUrl);
    }

    const handleMark = (e) => {
        if (actionState.action === 'markActive') {
            bandService.update(selectedBand.id, { active: true })
                .then(() => {
                    setIsBandActive(true)
                    setIsConfirmDialogDisplaying(false);
                    const updatedBand = { ...selectedBand, active: 'Active' };
                    updateSelectedBand(updatedBand);
                    showMessage({ severity: 'success', summary: 'Success', detail: 'Band marked as active' });
                    return updatedBand;
                })
                .then((band) => {
                    fetchBandsSuccess(bands.concat(band));
                })
                .catch((error) => {
                    showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update band" });
                    setIsConfirmDialogDisplaying(false);
                });
        }
        if (actionState.action === 'markInactive') {
            bandService.delete(selectedBand.id)
                .then(() => {
                    showMessage({ severity: 'success', summary: 'Success', detail: 'Band marked as inactive' });
                    setIsBandActive(false);
                    const updatedBand = { ...selectedBand, active: 'Inactive' };
                    updateSelectedBand(updatedBand);
                    setIsConfirmDialogDisplaying(false);
                })
                .then((band) => {
                    fetchBandsSuccess(bands.concat(band));
                })
                .catch((error) => {
                    showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update band" });
                    setIsConfirmDialogDisplaying(false);
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const band = {
            name: bandName,
            description: bandDescription,
            genres,
            manager: user.id,
            logo: imageUrl
        };
        bandService.update(selectedBand.id, band)
            .then((band) => {
                setIsConfirmDialogDisplaying(false);
                const updatedBand = { ...band, genres: band.genres.join(', ') };
                updateSelectedBand(updatedBand);
                showMessage({ severity: 'success', summary: 'Success', detail: 'Band Updated' });
                return updatedBand;
            })
            .then((band) => {
                fetchBandsSuccess(bands.concat(band));
            })
            .catch((error) => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update band" });
            });
    }

    const handleButtonClick = (e) => {
        const { id } = e.target;
        console.log(id);
        if (id === 'edit-band-save') {
            dispatch({ type: 'update', payload: bandName });
            setIsConfirmDialogDisplaying(true);
        }
        if (id === 'edit-band-mark' && isBandActive) {
            dispatch({ type: 'mark_inactive', payload: bandName });
            setIsConfirmDialogDisplaying(true);
        }
        if (id === 'edit-band-mark' && !isBandActive) {
            dispatch({ type: 'mark_active', payload: bandName });
            setIsConfirmDialogDisplaying(true);
        }
    }

    const renderModal = (
        <Modal show={isConfirmDialogDisplaying} onHide={() => setIsConfirmDialogDisplaying(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm changes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {actionState.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={actionState.action === 'update' ? handleSubmit : handleMark}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={() => setIsConfirmDialogDisplaying(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {renderModal}
            <div className="animated faster fadeIn">
                <form style={{ paddingLeft: '20px' }}>
                    <div className="row">
                        <div className="col-5">
                            <div className="form-group">
                                <label className="h6"><strong>Edit band logo</strong></label>
                                <FileUpload name="data"
                                    url={`${baseUrl}/storage/upload/image`}
                                    onUpload={onUpload}
                                    auto
                                    multiple={false} accept="image/*" maxFileSize={1000000} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="h6" htmlFor="band-name"><strong>Band name</strong></label>
                                <input defaultValue={bandName}
                                    type="text"
                                    className="form-control"
                                    id="band-name"
                                    onChange={(e) => setBandName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="h6" htmlFor="band-description"><strong>Band description</strong></label>
                                <textarea className="form-control" id="band-description" rows="3" onChange={(e) => setBandDescription(e.target.value)} defaultValue={bandDescription} />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="h6 col" htmlFor="band-genres">
                                        <strong>Band genres</strong>
                                    </label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MultiSelect
                                            style={{ width: '70%', minWidth: '12em' }}
                                            maxSelectedLabels={10}
                                            placeholder="Select genres"
                                            optionLabel="label"
                                            optionValue="value"
                                            id="Band-genres"
                                            value={genres}
                                            options={genreItems}
                                            onChange={(e) => setGenres(e.value)}
                                            selectedItemTemplate={selected}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9" />
                        <div className="col" style={{ paddingLeft: '74px' }}>
                            <Button id="edit-band-save" variant="success" type="button" onClick={handleButtonClick}>Save</Button>{' '}
                            <Button id="edit-band-mark" variant="secondary" type="button" onClick={handleButtonClick}>{`Mark as ${isBandActive ? 'inactive' : 'active'}`}</Button>
                        </div >

                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    selectedBand: selectSelectedBand,
    bands: selectBands
});

const mapDispatchTopProps = dispatch => ({
    updateSelectedBand: (band) => dispatch(selectBand(band)),
    fetchBandsSuccess: (bands) => dispatch(fetchBandsSuccess(bands)),
    showMessage: message => dispatch(showMessage(message))
});

export default connect(mapStateToProps, mapDispatchTopProps)(EditBand);