import React from 'react';
import image from '../../assets/register_bg.jpg';
import RegisterForm from '../../components/register/register-form';
import AuthPage from './auth-page';

const RegisterPage = () => {
    return (
        <>
            <AuthPage image={image}>
                <RegisterForm />
            </AuthPage>
        </>
    )
};

export default RegisterPage;
