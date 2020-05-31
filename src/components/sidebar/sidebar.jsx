import React, { useState } from 'react';
import SidebarLogo from './sidebar-logo';
import SidebarElement from './sidebar-element';
import iconsAndNames from './icons-and-element-names';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { logout } from '../../redux/auth/auth.actions';
import Cookies from 'js-cookie';

import './sidebar-element.css';

const Sidebar = () => {
    const renderSidebarElements = Object.keys(iconsAndNames).map(
        (element, index) => {
            const { text, icon, path } = iconsAndNames[element];
            return (
                <SidebarElement
                    key={index}
                    text={text}
                    path={path} >
                    {icon}
                </SidebarElement>
            )
        });


    const onLogout = () => {
        logout();
        Cookies.remove('jwt');
        window.location.href = '/';
    }
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <SidebarLogo />
            </div>
            <hr style={{ margin: '5px', backgroundColor: 'gray' }} />
            {renderSidebarElements}
            <div className="spacer-lg" />
            <span className="center">
                <button className="btn btn-primary text-light" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    {' Logout'}
                </button>
            </span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectUser
});

const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Sidebar));