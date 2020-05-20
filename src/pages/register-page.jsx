import React, { Fragment } from 'react';
import RegisterForm from '../components/register/register-form';
import Card from 'react-bootstrap/Card'
import './pages.css';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/auth/auth.selector';
import { Redirect } from 'react-router-dom';
const RegisterPage = ({ user }) => {
    if (!user) {
        return <Redirect to="/"></Redirect>
    };
    return (
        <div className="p-3 bg-dark fill-height center" >
            <>
                <Card style={{ width: '20rem', padding:'15px' }}>
                    <RegisterForm />
                </Card>
            </>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    user: selectUser
});



export default connect(
    mapStateToProps
)(RegisterPage);
