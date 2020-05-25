import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { registerSuccess } from '../../redux/auth/auth.actions';
import { Link } from 'react-router-dom';
import MiniLogo from '../mini-logo';
import SocialNetworkButton from './social-network-button'
import gLogo from '../../assets/google_logo.svg';
import fLogo from '../../assets/fb_logo.svg';
import authService from '../../services/AuthService';


const LoginForm = ({ registerUser, user }) => {
    const [password, setPassword] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [errorFeedback, setErrorFeedback] = useState('');

    useEffect(() => setErrorFeedback(''),[password,identifier]);

    const handleSubmit = (e) => {
        e.preventDefault();
        user = { identifier, password };
        authService.login(user)
            .then(value => {
                alert('Logged In!');
                window.location.href = '/';
            })
            .catch(error => {
                setErrorFeedback(error.message);
            });
    };

    return (
        <>
            <MiniLogo />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" required
                        id="inputName" placeholder="Enter email or username"
                        onChange={(e) => setIdentifier(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" required placeholder="Password"
                        id="inputPassword2" onChange={(e) => setPassword(e.target.value)} />

                    <small id="passwordFeedback" className="form-text text-danger">{errorFeedback}</small>
                </div>
                <button type="submit" className="btn btn-warning btn-block text-light">Log in</button>
            </form>
            <div className="spacer-mini" />
            <SocialNetworkButton action="google" text="Log in with Google" logo={gLogo} btnClass="btn-outline-primary" />
            <SocialNetworkButton action="facebook" text="Log in with Facebook" logo={fLogo} btnClass="btn-outline-primary" />
            <div className="spacer-mini" />
            <small className="center">Don't have an account? <Link style={{ paddingLeft: '5px' }} to="/register">Register here</Link></small>
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    user: selectUser
});

const mapDispatchToProps = dispatch => ({
    registerUser: user => dispatch(registerSuccess(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

