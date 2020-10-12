import React, { useState, useEffect, useContext } from 'react';
import { Container, Alert } from 'reactstrap';
import { useHistory } from 'react-router';

// Components, css
import './form.css';
import Login from './Login';
import Register from './Register';
import { AuthContext } from '../../context/AuthState';
import { ErrorContext } from '../../context/ErrorState';

export default function Welcome() {

    const history = useHistory();

    const [msg, setMsg] = useState('');

    const { auth } = useContext(AuthContext);
    const { error } = useContext(ErrorContext);

    useEffect(() => {
        if (error.id === 'REGISTER_FAIL' || error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.message)
        } else {
            setMsg('')
        }
        if(auth.isAuthenticated === true) {
            history.push('/home');
        }
    }, [auth, error]);

    return (
        <div className="container-fluid wrapper d-flex justify-content-center align-items-center">
            <Container className="blank">
                <div className="container-fluid">
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    {
                        history.location.pathname === '/register'
                            ? <Register />
                            : <Login />
                    }
                </div>
            </Container>
        </div>
    )
}
