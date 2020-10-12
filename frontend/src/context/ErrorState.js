import React, { createContext, useReducer } from 'react';
import ErrorReducer from './reducers/ErrorReducer';

export const ErrorContext = createContext()

export function ErrorProvider(props) {

    const [error, dispatch] = useReducer(ErrorReducer, {
        msg: null,
        status: null,
        id: null
    })

    const setError = (msg, status, id) => {
        dispatch({ type: 'SET_ERROR', payload: { msg, status, id } });
    }

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    }

    return (
        <ErrorContext.Provider value={{ error, setError, clearError }}>
            {props.children}
        </ErrorContext.Provider>
    )
}