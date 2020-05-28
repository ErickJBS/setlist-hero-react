import React, { useState, useRef, useReducer } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { FileUpload } from 'primereact/fileupload';
import Button from 'react-bootstrap/Button';
import genreItems from '../genre-items';
import bandService from '../../../services/BandService';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selector';
import {selectBand} from '../../../redux/band/band.actions';
import {selectSelectedBand} from '../../../redux/band/band.selector';
import { Growl } from 'primereact/growl'
import selected from '../../multiselect-selected';
import {useHistory} from 'react-router-dom';

import environment from 'environment';

const baseUrl = environment.api;



const EditBand = ({ user, selectedBand, updateSelectedBand }) => {
    const [genres, setGenres] = useState(selectedBand.genres.split(',').map(genre => genre.trim()));
    const [imageUrl, setImageUrl] = useState(selectedBand.logo);
    const [bandName, setBandName] = useState(selectedBand.name);
    const [bandDescription, setBandDescription] = useState(selectedBand.description);
    const history = useHistory();
    let growl = useRef(null);
    let bandUpdated = useRef(null);
    let bandUpdateError = useRef(null);

    const onUpload = (e) => {
        growl.current.show({ severity: 'success', summary: 'Success', detail: 'File Uploaded' });
        const response = JSON.parse(e.xhr.response);
        setImageUrl(response.downloadUrl);
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
        bandService.update(selectedBand.id,band)
            .then((element) => {
                bandUpdated.current.show({ severity: 'success', summary: 'Success', detail: 'Band Updated' });
                updateSelectedBand({...element, genres: element.genres.map((genre, index) => index === 0 ? genre : ` ${genre}`).join()});
            })
            .catch((error) => {
                bandUpdateError.current.show({severity: 'error', summary: 'Error Message', detail: "Couldn't update band"});
            });
    }

    return (
        <div className="animated faster fadeIn">
            <div className="spacer-sm"/>
            <Growl ref={bandUpdateError} position="topright"></Growl>
            <Growl ref={bandUpdated} position="topright"></Growl>
            <Growl ref={growl} position="topright"></Growl>
            <form style={{paddingLeft:'20px'}}onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-5">
                        <div className="form-group">
                            <label className="h6"><strong>Edit band logo</strong></label>
                            <FileUpload name="data"
                                url={`${baseUrl}/storage/upload`}
                                onUpload={onUpload}
                                multiple={false} accept="image/*" maxFileSize={1000000} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className="h6" htmlFor="band-name"><strong>Band name</strong></label>
                            <input defaultValue={bandName} type="text" className="form-control" id="band-name" onChange={(e) => setBandName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="h6" htmlFor="band-description"><strong>Band description</strong></label>
                            <textarea className="form-control" id="band-description" rows="3" onChange={(e) => setBandDescription(e.target.value)} defaultValue={bandDescription}/>
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
                <div className="row" style={{paddingLeft:'90%'}}>
                    <Button style={{width:'130px'}}variant="success" type="submit" >Save</Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    selectedBand: selectSelectedBand
});

const mapDispatchTopProps = dispatch => ({
    updateSelectedBand: (band) => dispatch(selectBand(band))
});

export default connect(mapStateToProps,mapDispatchTopProps)(EditBand);