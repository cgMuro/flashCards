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
    }, [auth.isAuthenticated])

    return (
        <Container fluid className="wrapper d-flex align-items-center justify-content-center">
            <div id="card-home">
                {
                    auth.user
                    ?
                        <>
                            <h4 className="text-center">Welcome {auth.user.username}</h4>
                            <Container fluid className="d-flex align-items-center justify-content-center flex-column p-0">
                                <Button 
                                    block 
                                    color="info" 
                                    className="mt-5 mb-2"
                                    onClick={() => history.push('/decks')}
                                >
                                    Your Decks
                                </Button>
                                <Button 
                                    block 
                                    color="info" 
                                    className="my-2"
                                >
                                    Create New Deck
                                </Button>

                                <Button color="primary" className="mt-5 mb-1">Profile</Button>
                                <Button 
                                    color="danger" 
                                    className="my-1"
                                    onClick={() => {
                                        logout();
                                        history.push('/');
                                        history.go(0);
                                    }}
                                >Logout</Button>
                            </Container>
                        </>
                    :
                        null
                }
            </div>
        </Container>
    )
}
