import React from 'react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectUser} from '../../redux/auth/auth.selector';
import {registerSuccess} from '../../redux/auth/auth.actions';
const RegisterForm = ({ registerUser, user }) => {

    return (
        <> 
            <div>
                <img src={logo} alt="logo" />
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                user = {email: 'some_email', password:'some_password'};
                registerUser(user);
            }}>
                <div className="form-group">
                    <input type="text" className="form-control" id="inputName" placeholder="Your name"/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="inputPass" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-warning btn-block text-white">Sign up</button>
            </form>
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
)(RegisterForm);

