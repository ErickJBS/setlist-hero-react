import React from 'react';
import Badge from 'react-bootstrap/Badge';

const TagTemplate = (rowData, column) => {
    return rowData.tags.length ? rowData.tags.map((tag,index) => (
        <React.Fragment key={index}>
            <span className="h6" key={index}><Badge variant="primary" style={{ padding: '6px' }}>{tag}</Badge></span>{' '}
        </React.Fragment>
    )) : 'No tags'
}

export default TagTemplate;
