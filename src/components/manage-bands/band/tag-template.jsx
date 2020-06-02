import React from 'react';
import Badge from 'react-bootstrap/Badge';

const TagTemplate = (rowData, column) => {
    return rowData.tags.map((tag,index) => (
        <React.Fragment key={index}>
            <span className="h6" key={index}><Badge variant="primary" style={{ padding: '6px' }}>{tag}</Badge></span>{' '}
        </React.Fragment>
    ))
}

export default TagTemplate;
