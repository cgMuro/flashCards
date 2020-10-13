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
    const deck_id = history.location.pathname.split('/')[2];
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


    const { cardState, getCards, shuffleCards } = useContext(CardContext);


    useEffect(() => {
        getCards(deck_id, true);
    }, []);


    const flipCard = () => {
        const element = document.querySelector('.flip-card-inner');
        if (element.classList.contains('flip-card-inner-active')) {
            element.classList.remove('flip-card-inner-active');
        } else {
            element.classList.add('flip-card-inner-active');
        }
    }

    // Handling cards
    const [cardIDX, setCardIDX] = useState(0);

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
        <Container fluid className="p-0">
            <Container fluid className="controlls-container d-flex flex-row align-items-center">
                <i
                    className="fas fa-chevron-circle-left fa-lg"
                    onClick={() => { history.goBack() }}>
                </i>
                <h4 className="m-auto">{deck_name}</h4>
            </Container>

            <Container fluid className="flip-card">
                <Container fluid className="flip-card-inner d-flex justify-content-center">
                    {
                        cardState.map((card, idx) => {
                            if (idx == cardIDX) {
                                return (
                                    <Container fluid key={card.id}>
                                        <Container fluid className="flip-card-front-learn text-center">
                                            <p className="mt-5 pt-5">{card.question}</p>
                                        </Container>
                                        <Container fluid className="flip-card-back-learn text-center">
                                            <p className="mt-5 pt-5">{card.answer}</p>
                                        </Container>
                                    </Container>
                                )
                            }
                        })
                    }
                </Container>
            </Container>
            <Container fluid className="controllers d-flex flex-row align-items-around justify-content-center">
                <Button color="primary" className="mr-2" style={{ width: '30%' }} onClick={() => previousCard()}>
                    Previous Card
                </Button>
                <Button color="dark" outline className="mx-3" onClick={() => flipCard()}>
                    See Answer
                </Button>
                <Button color="primary" className="ml-2" style={{ width: '30%' }} onClick={() =>nextCard()}>
                    Next Card
                </Button>
            </Container>
        </Container>
    )
}
