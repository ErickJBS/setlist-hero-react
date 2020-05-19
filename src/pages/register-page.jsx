import React, { Fragment } from 'react';
import RegisterForm from '../components/register/register-form';
import Card from 'react-bootstrap/Card'
import './pages.css';
const RegisterPage = () => {
    return (
        <div className="p-3 mb-2 bg-dark fill-height center" >
            <>
                <Card style={{ width: '20rem', padding:'15px' }}>
                    <RegisterForm />
                </Card>
            </>
        </div>
    )
};

export default RegisterPage;