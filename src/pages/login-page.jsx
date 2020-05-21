import React from 'react';
import LoginForm from '../components/login/login-form';
import Card from 'react-bootstrap/Card'
import '../theme/styles.css';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/auth/auth.selector';
import image from '../assets/login_bg.jpg';

const LoginPage = () =>{
    return (
        <div className="p-3 fill-height center" style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }}>
            <>
                <Card style={{ width: '20rem', padding:'15px' }}>
                    <LoginForm />
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
)(LoginPage);