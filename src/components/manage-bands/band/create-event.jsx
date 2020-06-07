import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { fetchEvents } from '../../../redux/event/events.actions';
import { selectEvents } from '../../../redux/event/events.selector';
import { showMessage } from '../../../redux/growl/growl.actions';
import eventService from '../../../services/EventService';

export const CreateEvent = ({ band, callback, showMessage, events, fetchEvents }) => {
    const [date, setDate] = useState(null);
    const [tags, setTags] = useState([]);
    const [tour, setTour] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [designer, setDesigner] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const event = {
            band: band.id,
            date: new Date(date).toLocaleDateString(),
            tags,
            tour,
            name,
            location,
            designer
        };
        eventService.create(event)
            .then(event => {
                callback();
                showMessage({ severity: 'success', summary: 'Success', detail: 'Event added' });
                return { ...event, date: new Date(event.date).toLocaleDateString() };
            })
            .then(newEvent => fetchEvents(events.concat(newEvent)))
            .catch(e => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't add event" })
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-name">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="event-name"
                        required value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="event-location"
                        required value={location}
                        onChange={e => setLocation(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-tour">Tour</label>
                    <div>
                        <Dropdown
                            id="event-tour" value={tour}
                            options={[{ label: 'No tour', value: 'no-tour' }]}
                            onChange={e => setTour(e.value)}
                            style={{ width: '12em' }}
                            editable={true} placeholder="Select if tour" />
                    </div>
                </div>
                <div className="col mb-3">
                    <label htmlFor="event-designer">Designer</label>
                    <input
                        type="email"
                        className="form-control"
                        id="event-designer"
                        required value={designer}
                        onChange={e => setDesigner(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="event-date">Event Date</label>
                    <div>
                        <Calendar
                            id="event-date"
                            value={date}
                            onChange={(e) => setDate(e.value)}
                            showButtonBar={true} />
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
                <div className="col-5" />
                <div className="col" style={{ paddingLeft: '85px' }}>
                    <button type="submit" className="btn btn-success mb-2" >Create event</button>{' '}
                    <button type="button" className="btn btn-secondary mb-2" onClick={callback}>Cancel</button>
                </div>
            </div>
        </form >
    )
}

const mapStateToProps = createStructuredSelector({
    events: selectEvents,
    band: selectSelectedBand
});

const mapDispatchToProps = dispatch => ({
    showMessage: message => dispatch(showMessage(message)),
    fetchEvents: events => dispatch(fetchEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
