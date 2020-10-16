import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import AuthReducer from './reducers/AuthReducer';
import { ErrorContext } from './ErrorState';

export const AuthContext = createContext();

export function AuthProvider(props) {

    const { setError } = useContext(ErrorContext);

    const [auth, dispatch] = useReducer(AuthReducer, {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        isLoading: false,
        user: null
    })


    // CONFIG TOKEN
    const tokenConfig = () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        if (token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
    }

    // LOAD USER
    const loadUser = async () => {
        dispatch({ type: 'LOAD_USER' });

        try {
            const res = await axios.get('/api/auth', tokenConfig());
            dispatch({ type: 'USER_LOADED', payload: res.data.user[0] });
            // history.push('/home');
        } catch (error) {
            setError(error.response.data, error.response.status);
            dispatch({ type: 'AUTH_ERROR' });
        }
    }

    // REGISTER USER
    const register = async ({ username, email, password }) => {

        const config = {
            'headers': {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ username, email, password })

        try {
            const res = await axios.post('/api/users', body, config)
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data })
        } catch (error) {
            setError(error.response.data, error.response.status, 'REGISTER_FAIL');
            dispatch({ type: 'REGISTER_FAIL' });
        }
    }

    // LOGIN
    const login = async ({ email, password }) => {
        const config = {
            'headers': {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth', body, config);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (error) {
            setError(error.response.data, error.response.status, 'LOGIN_FAIL');
            dispatch({ type: 'LOGIN_FAIL' });
        }
    }

    // UPDATE USER USERNAME
    const updateUserUsername = async (username) => {
        try {
            const res = await axios.put(`/api/users/${auth.user.id}`, { username }, tokenConfig());
            dispatch({ type: 'UPDATE_USERNAME', payload: res.data.user });
        } catch (error) {
            setError(error.response.data, error.response.status);
        }
    }

    // UPDATE USER PASSWORD
    const updateUserPassword = async (password) => {
        try {
            const res = await axios.put(`/api/users/${auth.user.id}`, { password }, tokenConfig());
            dispatch({ type: 'UPDATE_PASSWORD', payload: res.data.user });
        } catch (error) {
            setError(error.response.data, error.response.status);
        }
    }

    //LOGOUT
    const logout = () => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
    }

    return (
        <AuthContext.Provider value={{ auth, tokenConfig, loadUser, register, login, logout, updateUserUsername, updateUserPassword}}>
            {props.children}
        </AuthContext.Provider>
    )
}
