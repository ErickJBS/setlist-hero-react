import { MultiSelect } from 'primereact/multiselect';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'primereact/dropdown';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEvent } from '../../redux/event/events.actions';
import { selectSelectedEvent } from '../../redux/event/events.selector';
import { showMessage } from '../../redux/growl/growl.actions';
import eventService from '../../services/EventService';

const DeleteSet = ({ callback, event, selectEvent, showMessage }) => {
    const [formatedSets, setFormatedSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState({});

    useEffect(() => {
        setFormatedSets(
            event.setlist.map(set => ({
                label: set.name,
                value: set
            }))
        );
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        eventService.update(event.id, {
            ...event,
            tags: event.tags.split(', '),
            setlist: event.setlist.filter(set => set._id !== selectedSet._id)
        })
            .then(event => {
                const stateEvent = {
                    ...event,
                    tags: event.tags.join(', '),
                    date: new Date(event.date).toLocaleDateString()
                };
                selectEvent(stateEvent);
                callback();
                showMessage({ severity: 'success', summary: 'Success Message', detail: "Set deleted successfully" });
            })
            .catch(error => showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't delete setlist" }));
    }

    const handleDropdownChange = e => {
        setSelectedSet(e.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="set-name"><strong>Set</strong></label>
                <div>
                    <Dropdown
                        value={selectedSet}
                        options={formatedSets}
                        placeholder="Select set to delete"
                        onChange={handleDropdownChange}
                    />
                </div>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <div>
                    <Button variant="danger" type="submit" >Delete</Button>{' '}
                    <Button variant="secondary" onClick={callback}>Close</Button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = createStructuredSelector({
    event: selectSelectedEvent
})

const mapDispatchToProps = dispatch => ({
    selectEvent: event => dispatch(selectEvent(event)),
    showMessage: message => dispatch(showMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSet)