import React from 'react'
import Card from 'react-bootstrap/Card';

const GenericBodyCard = ({ title, children, className}) => {
    return (
        <Card style ={{padding: '15px'}} className={className}>
            {children}
        </Card>
    )
}

export default GenericBodyCard;