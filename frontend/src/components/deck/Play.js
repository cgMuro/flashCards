import React, { useEffect, useContext, useState } from 'react';
import { Button, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';

// Components, css
import './main.css';
import { CardContext } from '../../context/CardState';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';

export default function Play() {

    const history = useHistory();
    // Get deck id from url
    const deck_id = history.location.pathname.split('/')[2];
    // Get deck name from url
    const deck_name = history.location.pathname.split('/')[3].replace('%20', ' ');

    const { auth } = useContext(AuthContext);
    const { setAlertMsg } = useContext(AlertContext);

    // Don't allow access if is unathorized
    useEffect(() => {
        if (auth.isAuthenticated === false) {
            setAlertMsg('Please login to access that page.')
            history.push('/');
        }
    }, [auth.isAuthenticated]);


    const { cardState, getCards } = useContext(CardContext);

    const [isQuestion, setIsQuestion] = useState(true);

    // Get cards from database and shuffle them
    useEffect(() => {
        getCards(deck_id, true);
    }, []);

    // Flip card animation function
    const flipCard = () => {
        const element = document.querySelector('.flip-card-inner');
        if (element.classList.contains('flip-card-inner-active')) {
            element.classList.remove('flip-card-inner-active');
        } else {
            element.classList.add('flip-card-inner-active');
        }
        setIsQuestion(prevState => !prevState);
    }

    // Handling cards
    const [cardIDX, setCardIDX] = useState(0);
    // Previous card function
    const previousCard = () => {
        if (cardIDX > 0) {
            // Flip card if answer is visible
            if (document.querySelector('.flip-card-inner').classList.contains('flip-card-inner-active')) {
                flipCard();
                setTimeout(() => {
                    setCardIDX(prevState => prevState - 1);
                }, 800);
            } else {
                setCardIDX(prevState => prevState - 1);
            }
        }
    }
    // Next card function
    const nextCard = () => {
        if (cardIDX < cardState.length - 1) {
            // Flip card if answer is visible
            if (document.querySelector('.flip-card-inner').classList.contains('flip-card-inner-active')) {
                flipCard();
                setTimeout(() => {
                    setCardIDX(prevState => prevState + 1);
                }, 800);
            } else {
                setCardIDX(prevState => prevState + 1);
            }
        }
    }


    return (
        <Container fluid className="p-0 learning-container">
            <Container fluid className="controlls-container d-flex flex-row align-items-center">
                <i
                    className="fas fa-chevron-circle-left fa-lg"
                    onClick={() => { history.goBack() }}
                    style={{ cursor: 'pointer' }}
                >
                </i>
                <h4 className="m-auto">{deck_name}</h4>
            </Container>

            <Container fluid className="flip-card">
                <Container fluid className="flip-card-inner d-flex justify-content-center">
                    {
                        cardState.map((card, idx) => {
                            if (idx === cardIDX) {
                                return (
                                    <Container fluid key={card.id}>
                                        <Container fluid className="flip-card-front-learn text-center">
                                            <p className="mt-5 pt-5 question-text">{card.question}</p>
                                        </Container>
                                        <Container fluid className="flip-card-back-learn text-center">
                                            <p className="mt-5 pt-5 answer-text">{card.answer}</p>
                                        </Container>
                                    </Container>
                                )
                            }
                            return null;
                        })
                    }
                </Container>
            </Container>
            <Container fluid className="controllers d-flex flex-row align-items-around justify-content-center">
                <Button color="primary" className="mr-2" style={{ width: '30%' }} onClick={() => previousCard()}>
                    Previous Card
                </Button>
                <Button color="info" outline className="mx-3" onClick={() => flipCard()}>
                    { isQuestion ? 'See Answer' : 'See Question' }
                </Button>
                <Button color="primary" className="ml-2" style={{ width: '30%' }} onClick={() =>nextCard()}>
                    Next Card
                </Button>
            </Container>
        </Container>
    )
}
