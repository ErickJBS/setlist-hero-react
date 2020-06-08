import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showMessage } from '../../../redux/growl/growl.actions';
import { Dropdown } from 'primereact/dropdown';
import { selectEvents } from '../../../redux/event/events.selector';
import { fetchEvents } from '../../../redux/event/events.actions';
import eventService from '../../../services/EventService';
import { selectSelectedBand } from '../../../redux/band/band.selector';
import moment from 'moment';

const EditEvent = ({ band, callback, showMessage, events, fetchEvents, event }) => {
    const [date, setDate] = useState(new Date(event.date));
    const [tags, setTags] = useState(event.tags);
    const [tour, setTour] = useState(event.tour);
    const [name, setName] = useState(event.tour);
    const [location, setLocation] = useState(event.location);
    const [designer, setDesigner] = useState(event.designer);

    const handleSubmit = e => {
        e.preventDefault();
        const updateEvent = {
            band: band.id,
            date: new Date(date),
            tags,
            tour,
            name,
            location,
            designer
        };
        eventService.update(event.id,updateEvent)
            .then(event => {
                callback();
                showMessage({ severity: 'success', summary: 'Success', detail: 'Event updated' });
                return event;
            })
            .then(newEvent => fetchEvents(events.map( ev => {
                if (ev.id === event.id) return {...newEvent, date: moment(newEvent.date).format("MMM Do YYYY")};
                else return ev;
            })))
            .catch(e => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update event" })
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="edit-event-name">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="edit-event-name"
                        required value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="edit-event-location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="edit-event-location"
                        required value={location}
                        onChange={e => setLocation(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="edit-event-tour">Tour</label>
                    <div>
                        <Dropdown
                            id="edit-event-tour" value={tour}
                            options={[{ label: 'No tour', value: 'no-tour' }]}
                            onChange={e => setTour(e.value)}
                            style={{ width: '12em' }}
                            editable={true} placeholder="Select if tour" />
                    </div>
                </div>
                <div className="col mb-3">
                    <label htmlFor="edit-event-designer">Designer</label>
                    <input
                        type="email"
                        className="form-control"
                        id="edit-event-designer"
                        required value={designer}
                        onChange={e => setDesigner(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                    <label htmlFor="edit-event-date">Event Date</label>
                    <div>
                        <Calendar
                            id="edit-event-date"
                            value={date}
                            onChange={(e) => setDate(e.value)}
                            showButtonBar={true} />
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="edit-event-tags ">Tags</label>
                    <div >
                        <Chips value={tags} onChange={(e) => setTags(e.value)} separator=','></Chips>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-5" />
                <div className="col" style={{ paddingLeft: '85px' }}>
                    <button type="submit" className="btn btn-success mb-2" >Edit event</button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)
