import Cookies from 'js-cookie';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { logout } from '../../redux/auth/auth.actions';
import { selectUser } from '../../redux/auth/auth.selector';
import iconsAndNames from './icons-and-element-names';
import SidebarElement from './sidebar-element';
import './sidebar-element.css';
import SidebarLogo from './sidebar-logo';


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
            <hr style={{ margin: '5px' }} />
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