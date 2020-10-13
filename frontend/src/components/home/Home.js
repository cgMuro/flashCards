import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'


// Components, css
import './home.css';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';
import { Button, Container } from 'reactstrap';


export default function Home() {

    const history = useHistory();
    const { auth, logout } = useContext(AuthContext);
    const { setAlertMsg } = useContext(AlertContext);

    // Don't allow access if is unathorized
    useEffect(() => {
        if (auth.isAuthenticated === false) {
            setAlertMsg('Please login to access that page.')
            history.push('/');
        }
    }, [auth.isAuthenticated]);

    const flipCard = () => {
        const element = document.querySelector('.flip-card-inner');
        if (element.classList.contains('flip-card-inner-active')) {
            element.classList.remove('flip-card-inner-active');
        } else {
            element.classList.add('flip-card-inner-active');
        }
    }

    return (
        <Container fluid className="wrapper">
            <Container fluid className="flip-card">
                {
                    auth.user
                        ?
                        <Container fluid className="p-0 flip-card-inner">
                            <Container fluid className="flip-card-front">
                                <h4 className="text-center" style={{ textTransform: 'uppercase' }}>
                                    Welcome {auth.user.username}
                                </h4>
                                <Container fluid className="d-flex align-items-center justify-content-end flex-column">
                                    <Button
                                        block
                                        color="info"
                                        className="mt-5 mb-2"
                                        onClick={() => history.push('/decks')}
                                    >
                                        Your Decks
                                    </Button>
                                    <Button
                                        color="primary"
                                        className="mt-5 mb-1"
                                        onClick={() => flipCard()}
                                    >
                                        Profile
                                    </Button>
                                    <Button
                                        color="danger"
                                        className="my-1 mb-5"
                                        onClick={() => {
                                            logout();
                                            history.push('/');
                                            history.go(0);
                                        }}
                                    >Logout</Button>
                                </Container>
                            </Container>
                            <Container fluid className="flip-card-back">
                                <h3 className="text-center mb-5">Profile</h3>
                                <p><span className="mr-5 pr-5" style={{ color: 'gray' }}>Username</span>{auth.user.username}</p>
                                <hr/>
                                <p><span className="mr-5 pr-5" style={{ color: 'gray' }}>Email</span>{auth.user.email}</p>
                                <hr/>
                                <p><span className="mr-5 pr-5" style={{ color: 'gray' }}>Password</span>*********</p>
                                <hr/>
                                <Button
                                    color="primary"
                                    block
                                    className="mt-5 mb-1"
                                    onClick={() => flipCard()}
                                >
                                    Home
                                </Button>
                            </Container>
                        </Container>
                        :
                        null
                }
            </Container>
        </Container>
    )
}
