import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './sidebar-element.css';

const SidebarElement = ({children, text, path,callback,selected }) => {
    const history = useHistory();

    const handleClick = (path) => {
        history.push(`/dashboard/${path}`);
        callback();
    };
    return (
        <div className={`row selectable ${selected ? 'selected' : ''}`} style={{ padding: '10px' }}
            onClick={() => handleClick(path)}>
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
