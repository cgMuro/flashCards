import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Input, Form } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

// Components, css
import './main.css';
import { DeckContext } from '../../context/DeckState';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';

export default function Decks({ editState }) {

    const history = useHistory();
    const { auth } = useContext(AuthContext);
    const { setAlertMsg } = useContext(AlertContext);

    // Don't allow access if is unathorized
    useEffect(() => {
        if (auth.isAuthenticated === false) {
            setAlertMsg('Please login to access that page.')
            history.push('/');
        }
    }, [auth.isAuthenticated])

    // Init states
    const { deckState, getDecks, createDeck, updateDeck, deleteDeck } = useContext(DeckContext);



    // Get decks from database
    useEffect(() => {
        getDecks();
    }, []);



    // CREATE NEW DECK stuff
    // Init states
    const [addState, setAddState] = useState(false);
    const [newDeckName, setNewDeckName] = useState('');

    // Add function
    const handleAddState = () => {
        setAddState(() => true);
    }

    // Submit new deck function
    const submitNewDeck = (e) => {
        createDeck(newDeckName);
        setAddState(() => false);
        e.preventDefault();
    }


    // UPDATE DECK stuff
    const submitUpdateDeck = (e) => {
        updateDeck(e.target.firstElementChild.id, e.target.firstElementChild.value);
        setAlertMsg(`Deck updated`);
        e.preventDefault();
    }


    // DELETE DECK stuff
    // Delete function
    const handleDelete = ({ id, name }) => {
        deleteDeck(id);
        setAlertMsg(`Deck "${name}" was just deleted`);
    }

    return (
        <Container fluid className="mt-5">
            {
                deckState.length > 0
                    ?
                    <Row className="mt-5 d-flex justify-content-center">
                        {
                            deckState.map(deck => (
                                    <Col
                                        key={deck.id}
                                        xs="5"
                                        className="deck-container mx-2 my-4 d-flex justify-content-center align-items-center"
                                        onClick={() => {
                                            if (!editState) { 
                                                history.push(`/deck/${deck.id}/${deck.name}`);
                                            }
                                        }}
                                    >
                                        {
                                            editState
                                                ?
                                                <>
                                                    <i
                                                        className="fas fa-minus-circle"
                                                        onClick={() => handleDelete(deck)}
                                                    ></i>
                                                    <Form onSubmit={(e) => submitUpdateDeck(e)}>
                                                        <Input
                                                            id={deck.id}
                                                            type="text"
                                                            placeholder={deck.name}
                                                            className="update-deck-input"
                                                        />
                                                    </Form>
                                                </>
                                                :
                                                <p className="text-center">{deck.name}</p>
                                        }
                                    </Col>
                            ))
                        }
                    </Row>
                    :
                    <h3>You have no decks...create one</h3>

            }
            {
                editState
                    ?
                    <Row>
                        <Col
                            sm={6}
                            className="add-deck-container m-4 d-flex justify-content-center align-items-center"
                            onClick={() => handleAddState()}
                        >
                            {
                                !addState
                                    ?
                                    <i className="fas fa-plus-circle fa-4x"></i>
                                    :
                                    <Form onSubmit={(e) => submitNewDeck(e)}>
                                        <Input
                                            type="text"
                                            value={newDeckName}
                                            onChange={(e) => setNewDeckName(e.target.value)}
                                            autoFocus
                                            className="add-deck-input"
                                        />
                                    </Form>
                            }
                        </Col>
                    </Row>

                    :
                    null
            }
        </Container>
    )
}
