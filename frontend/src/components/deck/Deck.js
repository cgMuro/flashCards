import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Input, Form, Modal, FormGroup, Label, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

// Components, css
import './main.css';
import { CardContext } from '../../context/CardState';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';

export default function Deck({ editState }) {

    const history = useHistory();
    // Get deck id from url
    const deck_id = history.location.pathname.split('/')[2];
    // Get deck name from url
    const deck_name = history.location.pathname.split('/')[3];
    const { auth } = useContext(AuthContext);
    const { setAlertMsg } = useContext(AlertContext);

    // Don't allow access if is unathorized
    useEffect(() => {
        if (auth.isAuthenticated === false) {
            setAlertMsg('Please login to access that page.')
            history.push('/');
        }
    }, [auth.isAuthenticated]);


    // Init states
    const { cardState, getCards, createCard, updateCard, deleteCard } = useContext(CardContext);

    // Get cards from database
    useEffect(() => {
        getCards(deck_id);
    }, []);

    // Modal
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(prevState => !prevState);
        setAddState(() => false);
        setId('');
        setQuestion('');
        setAnswer('');
    }
    // Inputs values
    const [id, setId] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');


    const [addState, setAddState] = useState(false);

    // Create/update card
    const submitCard = (e) => {
        if (addState) {
            createCard({ deck_id, question, answer });
            setAddState(() => false);
        } else {
            updateCard({ id, question, answer });
            setAlertMsg(`Card updated`);
        }

        toggle();
        setId('');
        setQuestion('');
        setAnswer('');

        e.preventDefault();
    }


    // Delete function
    const handleDelete = (id) => {
        deleteCard(id);
        setAlertMsg(`Card deleted`);
    }


    return (
        <>
            <Container fluid className="mt-5">
                <h1 className="text-center my-4" style={{ color: 'rgb(245, 237, 237)' }}>{deck_name}</h1>
                {
                    cardState.length > 0
                        ?
                        <Container fluid>
                            <Button block color="primary" outline onClick={() => history.push(`/deck/${deck_id}/${deck_name}/learn`)}>
                                Start Learning
                            </Button>
                            <Row className="mt-5 d-flex justify-content-center">
                                {
                                    cardState.map(card => (
                                        <Col
                                            key={card.id}
                                            xs="5"
                                            lg="3"
                                            className="card-container mx-2 my-4 d-flex justify-content-center align-items-center flex-column"
                                        >
                                            {
                                                editState
                                                    ?
                                                    <i
                                                        className="fas fa-minus-circle"
                                                        onClick={() => handleDelete(card.id)}
                                                    ></i>
                                                    : null
                                            }
                                            <Container fluid
                                                onClick={() => {
                                                    if (editState) {
                                                        toggle();
                                                        setId(card.id);
                                                        setQuestion(card.question);
                                                        setAnswer(card.answer);
                                                    }
                                                }}
                                            >
                                                <p className="text-center">{card.question}</p>
                                                <hr />
                                                <p className="text-center">{card.answer}</p>
                                            </Container>
                                        </Col>
                                    ))
                                }
                                {
                                    editState
                                        ?
                                        <Col
                                            xs="5"
                                            lg="3"
                                            className="add-card-container m-4 d-flex justify-content-center align-items-center"
                                        >
                                            <i
                                                className="fas fa-plus-circle fa-4x"
                                                onClick={() => {
                                                    toggle();
                                                    setAddState(() => true);
                                                }}
                                            ></i>
                                        </Col>

                                        :
                                        null
                                }
                            </Row>

                        </Container>
                        :
                        <h3 style={{ color: 'rgb(245, 237, 237)' }} className="py-5">
                            You have no cards in this deck.
                            <br />
                            Create one by clicking the icon in the top left corner.
                        </h3>
                }
                {
                    editState && !cardState.length > 0
                        ?
                        <Col
                            xs="5"
                            lg="3"
                            className="add-card-container m-4 d-flex justify-content-center align-items-center"
                        >
                            <i
                                className="fas fa-plus-circle fa-4x"
                                onClick={() => {
                                    toggle();
                                    setAddState(() => true);
                                }}
                            ></i>
                        </Col>

                        :
                        null
                }
            </Container>


            <Modal isOpen={modal} toggle={toggle} centered>
                <Form onSubmit={(e) => submitCard(e)} className="m-4">
                    <FormGroup className="m-3">
                        <Label>
                            <b>Question</b>
                        </Label>
                        <Input type="textarea" value={question} onChange={(e) => setQuestion(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="m-3">
                        <Label>
                            <b>Answer</b>
                        </Label>
                        <Input type="textarea" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </FormGroup>
                    <Button color="info" block type="submit" className="w-75 mx-auto">{addState ? 'Create' : 'Update'}</Button>
                </Form>
            </Modal>
        </>
    )
}
