import React from 'react'
import BandTopBarElement from './band-topbar-element';
const elementsInfo = ['Members', 'Songs', 'Events', 'Edit'];

const renderTopBandElements = elementsInfo.map(
    (elementName, index) => (
        <BandTopBarElement key={index} text={elementName}/>
    )
);

const BandTopBar = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {renderTopBandElements}
            </div>
        </div>
    )
}

export default BandTopBar;