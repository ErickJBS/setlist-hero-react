import React, { Fragment } from 'react';
import RegisterForm from '../../components/register/register-form';
import AuthPage from './auth-page';
import image from '../../assets/register_bg.jpg';

const RegisterPage = () => {
    return (
        <>
        <AuthPage image = {image}>
            <RegisterForm/>
        </AuthPage>
    </>
    )
};

export default RegisterPage;
