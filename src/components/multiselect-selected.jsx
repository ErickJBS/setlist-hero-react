import React from 'react'

const selected = (value) => {
    if (value) {

        return (
            <div className="my-multiselected-item-token">
                <span>{value}</span>
            </div>
        );
    }
    else {
        return <span>Select genre</span>
    }
}
export default selected;