import React from 'react';
import LoginForm from '../../components/login/login-form';
import AuthPage from './auth-page';
import image from '../../assets/login_bg.jpg';

const LoginPage = () =>{
    return (
        <>
            <AuthPage image = {image}>
                <LoginForm/>
            </AuthPage>
        </>
    )
};

export default LoginPage;