import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import { ErrorProvider } from './context/ErrorState';
import { AuthProvider } from './context/AuthState';
import { AlertProvider } from './context/AlertState';
import { DeckProvider } from './context/DeckState';
import LoadUser from './components/LoadUser';
import Welcome from './components/welcome/Welcome';
import Home from './components/home/Home';
import BluePrint from './components/deck/BluePrint';
import { CardProvider } from './context/CardState';
import Play from './components/deck/Play';

function App() {
  return (
    <Router>
      <ErrorProvider>
        <AuthProvider>
          <AlertProvider>
            <DeckProvider>
              <CardProvider>
                <LoadUser />
                <Switch>
                  <Route path='/' exact component={Welcome} />
                  <Route path='/login' exact component={Welcome} />
                  <Route path='/register' exact component={Welcome} />
                  <Route path='/home' exact component={Home} />
                  <Route path='/decks' exact component={BluePrint} />
                  <Route path='/deck/:id/:deckname' exact component={BluePrint} />
                  <Route path='/deck/:id/:deckname/learn' exact component={Play} />
                </Switch>
              </CardProvider>
            </DeckProvider>
          </AlertProvider>
        </AuthProvider>
      </ErrorProvider>
    </Router>
  );
}

export default App;
