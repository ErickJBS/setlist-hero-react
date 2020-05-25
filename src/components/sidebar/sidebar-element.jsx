import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './sidebar-element.css';

const SidebarElement = ({ children, text, path }) => {
    const history = useHistory();
    const location = useLocation();

    const selected = location.pathname.match(path);

    return (
        <div className={`row selectable ${selected ? 'selected' : ''}`} style={{ padding: '10px' }}
            onClick={() => history.push(`/home/${path}`)}>
            <div className="col">
                <div className="row align-items-center">
                    <div className="col-sm-1">
                        {children}
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
