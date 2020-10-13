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
    const deck_id = history.location.pathname.split('/')[2];
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


    // DELETE CARD stuff
    // Delete function
    const handleDelete = (id) => {
        deleteCard(id);
        setAlertMsg(`Card deleted`);
    }


    return (
        <>
            <Container fluid className="mt-5">
                <h1 className="text-center my-4">{deck_name}</h1>
                {
                    cardState.length > 0
                        ?
                        <Container fluid>
                            <Button block color="primary" onClick={() => history.push(`/deck/${deck_id}/${deck_name}/learn`)}>
                                Start Learning
                            </Button>
                            <Row className="mt-5 d-flex justify-content-center">
                                {
                                    cardState.map(card => (
                                        <Col
                                            key={card.id}
                                            xs="5"
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
                                                <p className="text-center">{card.answer}</p>
                                            </Container>
                                        </Col>
                                    ))
                                }
                            </Row>

                        </Container>
                        :
                        <h3>You have no cards...create one</h3>
                }
                {
                    editState
                        ?
                        <Row>
                            <Col
                                xs={5}
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
                        </Row>

                        :
                        null
                }
            </Container>


            <Modal isOpen={modal} toggle={toggle} centered>
                <Form onSubmit={(e) => submitCard(e)}>
                    <FormGroup className="m-3">
                        <Label>
                            Question
                        </Label>
                        <Input type="textarea" value={question} onChange={(e) => setQuestion(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="m-3">
                        <Label>
                            Answer
                        </Label>
                        <Input type="textarea" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </FormGroup>
                    <Button type="submit">{addState ? 'Create' : 'Update'}</Button>
                </Form>
            </Modal>
        </>
    )
}
