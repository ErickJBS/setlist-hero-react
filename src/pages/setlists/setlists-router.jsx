import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../routing/PrivateRoute';
import SetlistsPage from './setlists-page';
import eventService from '../../services/EventService';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { selectEvents } from '../../redux/event/events.selector';
import { showMessage } from '../../redux/growl/growl.actions';
import { fetchEvents } from '../../redux/event/events.actions';
import ViewEvent from './view-event';

const SetlistsRouter = ({ user, showMessage, fetchEvents}) => {
    useEffect(() => {
        eventService.eventsByLED(user.id)
        .then(events => {
            const newEvents = events.map(
                event => ({
                    ...event,
                    date: new Date(event.date).toLocaleDateString()
                }));
            fetchEvents(newEvents);
        })
        .catch(error => {
            showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't fetch events" });
        }); 
    }, []);

    return (
        <Switch>
            <PrivateRoute path="/setlists/event/:id" component={ViewEvent} />
            <PrivateRoute component={SetlistsPage} />
        </Switch>
    )
}

const mapStateToProps = createStructuredSelector({
    events: selectEvents,
    user: selectUser
});

const mapDispatchToProps = dispatch => ({
    fetchEvents: events => dispatch(fetchEvents(events)),
    showMessage: message => dispatch(showMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetlistsRouter)
