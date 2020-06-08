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

const ModifySet = ({ songs, callback, event, selectEvent, showMessage }) => {
    const [formatedSets, setFormatedSets] = useState([]);
    const [setSongs, setSetSongs] = useState([]);
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
            setlist: event.setlist.map(set => {
                if (set._id === selectedSet._id) return { ...selectedSet, songs: setSongs }
                else return set;
            })
        })
            .then(event => {
                const stateEvent = {
                    ...event,
                    date: new Date(event.date).toLocaleDateString()
                };
                selectEvent(stateEvent);
                callback();
                showMessage({ severity: 'success', summary: 'Success Message', detail: "Set updated successfully" });
            })
            .catch(error => showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't update setlist" }));
    }

    const handleDropdownChange = e => {
        console.log(e.value);
        setSetSongs(e.value.songs);
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
                        placeholder="Select set to modify"
                        onChange={handleDropdownChange}
                    />
                </div>
            </div>
            <div className="form-group">
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
    event: selectSelectedEvent
})

const mapDispatchToProps = dispatch => ({
    selectEvent: event => dispatch(selectEvent(event)),
    showMessage: message => dispatch(showMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModifySet)