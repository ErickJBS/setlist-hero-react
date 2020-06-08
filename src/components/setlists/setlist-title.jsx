import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect';
import {selectSelectedEvent} from '../../redux/event/events.selector';
import Badge from 'react-bootstrap/Badge'

export const SetlistTitle = ({className, event}) => {
    const { name, tour, date, tags } = event;
    const generateTags = tags.lenght ? tags.map(
        (tag, index) => {
            return (
                <React.Fragment key={index}>
                    <span className="h6" key={index}><Badge variant="secondary" style={{ padding: '6px' }}>{tag}</Badge></span>{' '}
                </React.Fragment>
            );
        }
    ) : (<>No tags</>);

    return (
        <div className={className}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="spacer-mini" />
                        <span className="h3"><strong>{name}</strong></span>
                        <div className="spacer-mini" />
                        <div className="d-flex flex-row">
                            <p className="text-primary" style={{marginRight:'15px'}}>
                                <strong>{`Tour: ${tour}`}</strong>
                            </p>
                            <p className="text-primary">
                                <strong>{`Date: ${date}`}</strong>
                            </p>
                        </div>
                        <div>
                            {generateTags}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    event: selectSelectedEvent
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SetlistTitle)
