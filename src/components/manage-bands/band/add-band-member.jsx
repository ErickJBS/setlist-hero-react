import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { showMessage } from '../../../redux/growl/growl.actions';
import { fetchMusiciansSuccess } from '../../../redux/musician/musician.actions';
import { selectMusicians } from '../../../redux/musician/musician.selector';
import musicianService from '../../../services/MusicianService';
import options from './instruments-options';


const AddBandMember = ({ callback, selectedBand, musicians, fetchMusicians, showMessage }) => {
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const musician = {
            instrument: selectedInstrument,
            email,
            band: selectedBand.id
        }
        musicianService.create(musician)
            .then(musician => {
                setTimeout(callback, 1000);
                showMessage({ life: 650, severity: 'success', summary: 'Success', detail: 'Member added' });
                return musicianService.getById(musician.id)
            })
            .then(musician => {
                const { band, instrument, id, email, user } = musician;
                return {
                    band,
                    instrument, //transform to Pascal case
                    email,
                    id,
                    status: user ? 'Active' : 'Pending',
                    username: user?.username,
                    name: user?.displayName
                };
            })
            .then(newMusician => fetchMusicians(musicians.concat(newMusician)))
            .catch(e => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't add member" });
            });

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label h6">Email</label>
                    <div class="col-sm-9">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="inputEmail3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="member-instrument" className="col-sm-3 col-form-label h6">Instrument</label>
                    <div class="col-sm-9">
                        <Dropdown options={options} value={selectedInstrument} onChange={e => setSelectedInstrument(e.value)} placeholder="Select an instrument" id="member-instrument" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-7" />
                    <div className="col" style={{ paddingLeft: '43px' }}>
                        <button type="submit" className="btn btn-success mb-2">Submit</button>{' '}
                        <button type="button" className="btn btn-secondary mb-2" onClick={callback}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    selectedBand: selectSelectedBand,
    musicians: selectMusicians
});
const mapDispatchTopProps = dispatch => ({
    fetchMusicians: musicians => dispatch(fetchMusiciansSuccess(musicians)),
    showMessage: message => dispatch(showMessage(message))
})

export default connect(mapStateToProps, mapDispatchTopProps)(AddBandMember);