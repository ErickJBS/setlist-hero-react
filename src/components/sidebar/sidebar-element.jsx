import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './sidebar-element.css';

const SidebarElement = ({ children, text, path }) => {
    const history = useHistory();
    const location = useLocation();

    const selected = location.pathname.match(path);

    const content = location.pathname.match('dashboard') && selected ?
        React.cloneElement(children, {
            style: { filter: 'invert(85%) sepia(43%) saturate(3521%) hue-rotate(352deg) brightness(102%) contrast(104%)' }
        }) : children;

    return (
        <div className={`row selectable ${selected ? 'selected' : ''}`} style={{ padding: '10px' }}
            onClick={() => history.push(`/home/${path}`)}>
            <div className="col">
                <div className="row align-items-center">
                    <div className="col-sm-1">
                        {content}
                    </div>
                    <div className="col">
                        <span className="h6" >{text}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SidebarElement;
