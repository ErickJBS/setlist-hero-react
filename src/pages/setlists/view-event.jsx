import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import PrivateRoute from '../../routing/PrivateRoute';
import { selectSelectedEvent } from '../../redux/event/events.selector';
import Card from 'react-bootstrap/Card';
import SetlistTitle from '../../components/setlists/setlist-title';
import EventSetlist from '../../components/setlists/event-setlist';

const ViewEvent = ({selectedEvent}) => {
    const { id } = useParams();

    if (id !== selectedEvent.id) return <Redirect to="/setlists" />

    return (
        <div className="container-fluid animated faster fadeIn" style={{ padding: '20px' }}>
            <Card className="shadowed" style={{ padding: '20px' }}>
                <Card.Body>
                    <SetlistTitle />
                    <hr />
                    <div className="spacer-mini" />
                    <EventSetlist/>
                </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectedEvent: selectSelectedEvent
});

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent)
