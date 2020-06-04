import environment from 'environment';
import { FileUpload } from 'primereact/fileupload';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { fetchBandsSuccess } from '../../redux/band/band.actions';
import { selectBands } from '../../redux/band/band.selector';
import { showMessage } from '../../redux/growl/growl.actions';
import bandService from '../../services/BandService';
import selected from '../multiselect-selected';
import genreItems from './genre-items';


const baseUrl = environment.api;



const CreateBand = ({ user, callback, fetchBands, bands, showMessage }) => {
    const [genres, setGenres] = useState('');
    const [imageUrl, setImageUrl] = useState(undefined);
    const [bandName, setBandName] = useState('');
    const [bandDescription, setBandDescription] = useState('');

    const onUpload = (e) => {
        showMessage({ severity: 'success', summary: 'Success', detail: 'File Uploaded' });
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
        bandService.create(band)
            .then((result) => {
                const newBands = bands.concat({ ...result, genres: result.genres.join(', ') })
                callback();
                fetchBands(newBands);
                showMessage({ severity: 'success', summary: 'Success', detail: 'Band Created' });

            })
            .catch((error) => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't create band" });
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-5">
                        <div className="form-group">
                            <label className="h6" htmlFor="create-band-profile-pic"><strong>Upload band logo</strong></label>
                            <div>
                                <FileUpload
                                    name="data" id="create-band-profile-pic"
                                    multiple={false}
                                    auto
                                    url={`${baseUrl}/storage/upload/image`}
                                    onUpload={onUpload}
                                    accept="image/*" maxFileSize={1000000}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="h6">Profile selected:</label>
                            {imageUrl && <img className="animated faster fadeIn rounded"src={imageUrl} alt="band logo" style={{Left:'10px',height:'100px', width:'100px'}} />}
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
                            <div className="col" style={{paddingLeft:'57px'}}>
                                <Button variant="success" type="submit" >Save</Button>{' '}
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
    user: selectUser,
    bands: selectBands
});

const mapDispatchToProps = dispatch => ({
    fetchBands: bands => dispatch(fetchBandsSuccess(bands)),
    showMessage: message => dispatch(showMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateBand);