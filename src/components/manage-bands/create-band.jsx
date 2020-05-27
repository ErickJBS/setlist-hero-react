import React, { useState, useRef, useReducer } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { FileUpload } from 'primereact/fileupload';
import Button from 'react-bootstrap/Button';
import genreItems from './genre-items';
import bandService from '../../services/BandService';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { Growl } from 'primereact/growl'
import selected from '../multiselect-selected';

import environment from 'environment';

const baseUrl = environment.api;



const CreateBand = ({ user, callback }) => {
    const [genres, setGenres] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bandName, setBandName] = useState('');
    const [bandDescription, setBandDescription] = useState('');

    let growl = useRef(null);
    let bandCreated = useRef(null);

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
            manager: user._id,
            logo: imageUrl
        };
        bandService.create(band)
            .then(() => {
                callback();
                bandCreated.current.show({ severity: 'success', summary: 'Success', detail: 'Band Created' });
            })
            .catch((error) => {
                bandCreated.current.show({severity: 'error', summary: 'Error Message', detail: "Couldn't create band"});
            });
    }

    return (
        <>

            <Growl ref={bandCreated} position="topright"></Growl>
            <Growl ref={growl} position="topleft"></Growl>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-5">
                        <div className="form-group">
                            <FileUpload name="data"
                                url={`${baseUrl}/storage/upload`}
                                onUpload={onUpload}
                                multiple={false} accept="image/*" maxFileSize={1000000} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className="h6" htmlFor="band-name"><strong>Band name</strong></label>
                            <input type="text" className="form-control" id="band-name" onChange={(e) => setBandName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="h6" htmlFor="band-description"><strong>Band description</strong></label>
                            <textarea className="form-control" id="band-description" rows="3" onChange={(e) => setBandDescription(e.target.value)}></textarea>
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
                        <div className="row">
                            <div className="col-8"></div>
                            <div className="col">
                                <Button style={{ marginRight: '10px' }} variant="success" type="submit" >Save</Button>
                                <Button variant="secondary" onClick={callback}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectUser
});

export default connect(mapStateToProps)(CreateBand);