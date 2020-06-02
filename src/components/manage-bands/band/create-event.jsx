import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showMessage } from '../../../redux/growl/growl.actions';
import { Dropdown } from 'primereact/dropdown';

export const CreateEvent = ({ callback, showMessage }) => {
    const [date, setDate] = useState(null);
    const [tags, setTags] = useState([]);
    const [tour, setTour] = useState('');
    return (
        <form>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-name">Event Name</label>
                    <input type="text" className="form-control" id="event-name" required />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-location">Location</label>
                    <input type="text" className="form-control" id="event-location" required />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-tour">Tour</label>
                    <div>
                        <Dropdown id="event-tour" value={tour} options={[{ label: 'No tour', value: 'no-tour' }]} onChange={e => setTour(e.value)} style={{ width: '12em' }}
                            editable={true} placeholder="Select if tour" />
                    </div>
                </div>
                <div className="col mb-3">
                    <label htmlFor="event-designer">Designer</label>
                    <imput type="email" className="form-control" id="event-location" required/>
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-date">Event Date</label>
                    <div>
                        <Calendar id="event-date" value={date} onChange={(e) => setDate(e.value)} showButtonBar={true} />
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="event-tags ">Tags</label>
                    <div >
                        <Chips value={tags} onChange={(e) => setTags(e.value)} separator=','></Chips>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-6" />
                <div className="col" style={{ paddingLeft: '52px' }}>
                    <button type="submit" className="btn btn-success mb-2" >Create song</button>{' '}
                    <button type="button" className="btn btn-secondary mb-2" onClick={callback}>Cancel</button>
                </div>
            </div>
        </form >
    )
}

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({
    showMessage: message => dispatch(showMessage(message))
})

export default connect(null, mapDispatchToProps)(CreateEvent)
