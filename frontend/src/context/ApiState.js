import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

import ApiReducer from './reducers/ApiReducer';
import { ErrorContext } from './ErrorState';
import { AuthContext } from './AuthState';

export const ApiContext = createContext();

export function ApiProvider(props) {

    const [deckState, dispatch] = useReducer(ApiReducer, []);
    const { setError } = useContext(ErrorContext);
    const { tokenConfig } = useContext(AuthContext);

    // Get all decks
    const getDecks = async() => {
        try {
            const res = await axios.get('/api/decks', tokenConfig());
            dispatch({ type: 'GET', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name)
        }
    }

    // Get single deck
    const getDeck = async(id) => {
        try {
            const res = await axios.get(`/api/decks/${id}`, tokenConfig());
            dispatch({ type: 'GET', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name)
        }
    }

    // Create new deck
    const createDeck = async(name) => {
        try {
            const res = await axios.post('/api/decks', { name }, tokenConfig());
            dispatch({ type: 'ADD', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name);
        }
    }

    // Update deck
    const updateDeck = async(id, data) => {
        try {
            const res = await axios.put(`/api/decks/${id}`, data, tokenConfig());
            // dispatch({ type: 'ADD', payload: res.data.data });
            // DISPATCH?
        } catch (error) {
            setError(error.message, error.name);
        }
    }

    // Delete deck
    const deleteDeck = async(id) => {
        try {
            const res = await axios.delete(`/api/decks/${id}`, tokenConfig());
            // dispatch({ type: 'ADD', payload: res.data.data });
            // DISPATCH?
        } catch (error) {
            setError(error.message, error.name);
        }
    }

    return (
        <ApiContext.Provider value={{ deckState, getDecks, getDeck, createDeck, updateDeck, deleteDeck }}>
            {props.children}
        </ApiContext.Provider>
    )
}