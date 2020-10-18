import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

import ApiReducer from './reducers/ApiReducer';
import { ErrorContext } from './ErrorState';
import { AuthContext } from './AuthState';

export const CardContext = createContext();

export function CardProvider(props) {

    const [cardState, dispatch] = useReducer(ApiReducer, []);
    const { setError } = useContext(ErrorContext);
    const { tokenConfig } = useContext(AuthContext);


    // Shuffle the cards array when requested
    const shuffleCards = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Get all cards
    const getCards = async (deck_id, shuffle = false) => {
        try {
            const res = await axios.get(`/api/cards/deck/${deck_id}`, tokenConfig());
            if (shuffle) {
                shuffleCards(res.data.data);
            }
            dispatch({ type: 'GET', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name)
        }
    }

    // Get single card
    const getCard = async (id) => {
        try {
            const res = await axios.get(`/api/cards/${id}`, tokenConfig());
            dispatch({ type: 'GET', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name)
        }
    }

    // Create new Card
    const createCard = async ({ deck_id, question, answer }) => {
        try {
            const res = await axios.post(`/api/cards/deck/${deck_id}`, { question, answer }, tokenConfig());
            dispatch({ type: 'ADD', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name);
        }
    }

    // Update Card
    const updateCard = async ({ id, question, answer }) => {
        try {
            const res = await axios.put(`/api/cards/${id}`, { question, answer }, tokenConfig());
            console.log(res.data)
            dispatch({ type: 'UPDATE', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name);
        }
    }

    // Delete Card
    const deleteCard = async (id) => {
        try {
            const res = await axios.delete(`/api/cards/${id}`, tokenConfig());
            dispatch({ type: 'DELETE', payload: res.data.data });
        } catch (error) {
            setError(error.message, error.name);
        }
    }

    return (
        <CardContext.Provider value={{ cardState, getCards, getCard, createCard, updateCard, deleteCard, shuffleCards }}>
            {props.children}
        </CardContext.Provider>
    )
}