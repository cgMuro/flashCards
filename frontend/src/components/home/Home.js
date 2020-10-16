import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'


// Components, css
import './home.css';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


export default function Home() {

    const history = useHistory();
    const { auth, logout, updateUserUsername, updateUserPassword } = useContext(AuthContext);
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

    // Update user
    const [update, setUpdate] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdateState = () => {
        setUpdate(prevState => !prevState);

        // Update username/password if something is typed
        if (username != '') {
            updateUsername(null);
        }
        if (password != '') {
            updatePassword(null);
        }
    }

    const updateUsername = (e) => {
        updateUserUsername(username);
        setUsername('');
        setPassword('');
        setUpdate(() => false);

        if (e) {
            e.preventDefault();
        }
    }


    const updatePassword = (e) => {
        updateUserPassword(password);
        setUsername('');
        setPassword('');
        setUpdate(() => false);

        if (e) {
            e.preventDefault();
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
                                <>
                                    {
                                        update
                                            ?
                                            <Form onSubmit={(e) => updateUsername(e)} inline>
                                                <Label style={{ color: 'gray' }} for="update-username">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="update-username"
                                                    type="text"
                                                    name="username"
                                                    value={username}
                                                    placeholder={auth.user.username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="update-profile-input ml-2 my-auto"
                                                    bsSize="sm"
                                                />
                                            </Form>
                                            :
                                            <p className="pb-2">
                                                <span className="mr-5 pr-5" style={{ color: 'gray' }}>Username</span>
                                                {auth.user.username}
                                            </p>
                                    }
                                </>
                                <hr />
                                <p><span className="mr-5 pr-5 pb-2" style={{ color: 'gray' }}>Email</span>{auth.user.email}</p>
                                <hr />
                                <>
                                    {
                                        update
                                            ?
                                            <Form onSubmit={(e) => updatePassword(e)} inline>
                                                <Label style={{ color: 'gray' }} for="update-password">
                                                    Password
                                                </Label>
                                                <Input
                                                    id="update-password"
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="update-profile-input ml-2 my-auto"
                                                    bsSize="sm"
                                                />
                                            </Form>
                                            :
                                            <p className="pb-2">
                                                <span className="mr-5 pr-5" style={{ color: 'gray' }}>Password</span>
                                                *********
                                            </p>
                                    }
                                </>
                                <hr />
                                <Button
                                    color="dark"
                                    outline
                                    block
                                    className="mt-5 mb-1"
                                    onClick={() => handleUpdateState()}
                                >
                                    Update Profile
                                </Button>
                                <Button
                                    color="primary"
                                    block
                                    className=""
                                    onClick={() => {
                                        flipCard();
                                        setUpdate(() => false);
                                    }}
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
