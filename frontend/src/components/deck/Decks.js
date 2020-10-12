import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Input, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';

// Components, css
import './main.css';
import { ApiContext } from '../../context/ApiState';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';

export default function Decks() {

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
    const { deckState, getDecks, createDeck } = useContext(ApiContext);
    const [editState, setEditState] = useState(false);
    
    

    // Get decks from database
    useEffect(() => {
        getDecks();
    }, []);
    
    // Change EditState
    const handleEditState = () => {
        setEditState((prevState) => !prevState);
    }
    


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



    // DELETE DECK stuff
    // Delete function
    const handleDelete = () => {
        console.log('delete');
    }

    return (
        <Container fluid>
            <Container fluid className="p-0 text-right mt-2" id="edit-container">
                <div><i className="fas fa-edit" onClick={() => handleEditState()}></i></div>
            </Container>
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
                                            if (!editState) { history.push(`/deck/${deck.id}`) }
                                        }}
                                    >
                                        {
                                            editState 
                                            ? 
                                                <i 
                                                    className="fas fa-minus-circle"
                                                    onClick={() => handleDelete()}
                                                ></i> 
                                            : null
                                        }
                                        <p className="text-center">{deck.name}</p>
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
        </Container>
    )
}
