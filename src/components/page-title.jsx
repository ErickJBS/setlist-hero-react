import React from 'react'
import Card from 'react-bootstrap/Card';

const PageTitle = ({ title, children, className }) => {
    return (
        <Card style ={{paddingLeft: '50px',paddingTop:'15px', paddingBottom:'15px'}} className={className}>
            <span className="h5"><strong>{title}</strong></span>
            <div className="spacer"/>
            <p className="text-muted">{children}</p>
        </Card>
    )
}

export default PageTitle;