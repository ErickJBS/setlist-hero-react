import React from 'react'
import Card from 'react-bootstrap/Card';

const PageTitle = ({ title, children, className }) => {
    return (
        <Card style ={{padding: '30px'}} className={className}>
            <span className="h5"><strong>{title}</strong></span>
            <div className="spacer"/>
            <p className="text-muted">{children}</p>
        </Card>
    )
}

export default PageTitle;