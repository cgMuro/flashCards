import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Input, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';

// Components, css
import './main.css';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';
import Decks from './Decks';
import Deck from './Deck';

export default function BluePrint() {

    const history = useHistory();
    const { auth } = useContext(AuthContext);
    const { setAlertMsg } = useContext(AlertContext);

    // Don't allow access if is unathorized
    useEffect(() => {
        if (auth.isAuthenticated === false) {
            setAlertMsg('Please login to access that page.')
            history.push('/');
        }
    }, [auth.isAuthenticated]);

    const [path, setPath] = useState('')

    useEffect(() => {
        setPath(() => history.location.pathname);
    }, [history.location.pathname])


    const [editState, setEditState] = useState(false);

    // Change EditState
    const handleEditState = () => {
        setEditState((prevState) => !prevState);
    }

    return (
        <Container fluid className="p-0" style={{ backgroundColor: '#232121' }}>
            <Container fluid className="controlls-container d-flex justify-content-between align-items-center">
                <i
                    className="fas fa-chevron-circle-left fa-lg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        if (path == '/decks') {
                            history.push('/');
                        } else {
                            history.goBack();
                        }
                    }}></i>
                <i
                    className="fas fa-edit fa-lg"
                    onClick={() => handleEditState()}
                    style={editState ? { color: '#be0d13'} : { color: 'black' }}
                ></i>
            </Container>
            <Container fluid className="mt-5">
                {
                    path == '/decks'
                        ?
                        <Decks editState={editState} handleEditState={handleEditState} />
                        :
                        <Deck editState={editState} handleEditState={handleEditState} />
                }
            </Container>
        </Container>
    )
}
