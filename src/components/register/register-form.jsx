import React, { useState, useEffect } from 'react';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { registerSuccess } from '../../redux/auth/auth.actions';
import { validatePassword } from '../../utils/RegisterUtils';
import { Redirect, Link } from 'react-router-dom';
import MiniLogo from '../mini-logo';
import authService from '../../services/AuthService';

const RegisterForm = ({ registerUser, user }) => {

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordFeedback, setPasswordFeedback] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordConfirmed, setPasswordConfifmed] = useState(false);
    const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect( () => {
        if (password !== confirmPassword){
            setConfirmPasswordFeedback('Passwords are different');
            setPasswordConfifmed(false);
        }
        else {
            setConfirmPasswordFeedback('');
            setPasswordConfifmed(true);
        } 
    },
    [password,confirmPassword]);

    useEffect(() => {
        if (password === '') setPasswordFeedback('');
        else if (!validatePassword(password)) {
            setPasswordFeedback('Password must have at least one capital letter, one lowercase letter, one number and one special character (! @ # \$ % \^ & \*)');
        } else {
            setPasswordFeedback('');
            setValidPassword(true);
        }
    },[password]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validPassword && passwordConfirmed) {
            user = {email, displayName: name, password, username };
            authService.register(user)
            .then(value => {
                console.log(value);
                setIsRegistered(true);
                alert('user registered');
            })
           .catch(error =>{
               setConfirmPasswordFeedback(error.message);
           });

        }
    };
    if (isRegistered){
        return <Redirect to="/login"/>
    }
    return (
        <>
            <MiniLogo/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" required
                        id="inputName" placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="inputUsername"
                        placeholder="Enter username" required
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id="inputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email" required
                        onChange={(e) => setEmail(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" required placeholder="Password"
                        id="inputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    <small id="passwordFeedback" className="form-text text-danger">{passwordFeedback}</small>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" required placeholder="Confirm Password"
                        id="inputPassword2" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <small id="passwordFeedback" className="form-text text-danger">{confirmPasswordFeedback}</small>
                </div>
                <button type="submit" className="btn btn-warning btn-block text-light">Register</button>
            </form>
            <div className="spacer-mini"/>
            <small className="center">Already have an account? <Link style={{paddingLeft: '5px'}} to="/login">Login here</Link></small>
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

