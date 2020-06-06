import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import Button from 'react-bootstrap/Button';
import eventService from '../../services/EventService';
import { selectSelectedEvent, selectEvents } from '../../redux/event/events.selector';
import { createStructuredSelector } from 'reselect';
import { selectEvent, fetchEvents } from '../../redux/event/events.actions';
import { showMessage } from '../../redux/growl/growl.actions';

const AddSet = ({ songs, callback, event, selectEvent, fetchEvents, events, showMessage }) => {
    const [name, setName] = useState('');
    const [setSongs, setSetSongs] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        eventService.update(event.id, {
            ...event,
            tags: event.tags.split(', '),
            setlist: event.setlist.concat([{name, songs: setSongs}])
        })
        .then(event => {
            const stateEvent = {
                ...event, 
                tags: event.tags.join(', '),
                date: new Date(event.date).toLocaleDateString()
            };
            selectEvent(stateEvent);
            callback();
            showMessage({ severity: 'success', summary: 'Success Message', detail: "Set added successfully" });
        })
        .catch(error => showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update setlist" }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="set-name"><strong>Set name</strong></label>
                <input
                    type="text"
                    
                    id="set-name"
                    class="form-control"
                    onChange={e => setName(e.target.value)}
                    placeholder="Set name"
                    aria-describedby="helpId" />
            </div>
            <div class="form-group">
                <label for="set-songs"><strong>Set songs</strong></label>
                <div>
                    <MultiSelect
                        style={{ minWidth: '15em' }}
                        id="set-songs"
                        placeholder="Set Songs"
                        value={setSongs}
                        onChange={e => setSetSongs(e.value)}
                        options={songs} />
                </div>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <div>
                    <Button variant="success" type="submit" >Save</Button>{' '}
                    <Button variant="secondary" onClick={callback}>Close</Button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = createStructuredSelector({
    event: selectSelectedEvent,
    events: selectEvents
})

const mapDispatchToProps = dispatch => ({
    selectEvent: event => dispatch(selectEvent(event)),
    showMessage: message => dispatch(showMessage(message)),
    fetchEvents: events => dispatch(fetchEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSet)
