import React from 'react'

const selected = (value) => {
    if (value) {
        return (
            <div className="my-multiselected-item-token">
                {value}
            </div>
        );
    }
    else {
        return <span>Select genre</span>
    }
}
export default selected;