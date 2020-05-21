import React, { Fragment } from 'react';
import RegisterForm from '../components/register/register-form';
import Card from 'react-bootstrap/Card'
import '../theme/styles.css';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/auth/auth.selector';
import { Redirect } from 'react-router-dom';
import image from '../assets/register_bg.jpg';
const RegisterPage = ({ user }) => {
    return (
        <div className="p-3 fill-height center" style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }}>
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
