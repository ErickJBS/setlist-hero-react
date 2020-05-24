import React, { useReducer, useState } from 'react';
import SidebarLogo from './sidebar-logo';
import SidebarElement from './sidebar-element';
import iconsAndNames from './icons-and-element-names';
import { withRouter, useHistory } from 'react-router-dom';
import './sidebar-element.css';

const Sidebar = () => {
    const [selected, setSelected] = useState('');

    const renderSidebarElements = Object.keys(iconsAndNames).map(
        (element, index) => {
            const { text, icon, path } = iconsAndNames[element];
            return (
                <SidebarElement
                    callback={() => setSelected(text)}
                    selected={selected === text}
                    key={index}
                    text={text}
                    path={path} >
                    {icon}
                </SidebarElement>
            )
        });

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <SidebarLogo />
            </div>
            <hr style={{ margin: '5px', backgroundColor: 'gray' }} />
            {renderSidebarElements}
        </div>
    )
}
export default withRouter(Sidebar);