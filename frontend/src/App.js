import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import { ErrorProvider } from './context/ErrorState';
import { AuthProvider } from './context/AuthState';
import { AlertProvider } from './context/AlertState';
import { ApiProvider } from './context/ApiState';
import LoadUser from './components/LoadUser';
import Welcome from './components/welcome/Welcome';
import Home from './components/home/Home';
import Decks from './components/deck/Decks';

function App() {
  return (
    <Router>
      <ErrorProvider>
        <AuthProvider>
          <AlertProvider>
            <ApiProvider> 
              <LoadUser />
              <Switch>
                <Route path='/' exact component={Welcome} />
                <Route path='/login' exact component={Welcome} />
                <Route path='/register' exact component={Welcome} />
                <Route path='/home' exact component={Home} />
                <Route path='/decks' exact component={Decks} />
              </Switch>
            </ApiProvider>
          </AlertProvider>
        </AuthProvider>
      </ErrorProvider>
    </Router>
  );
}

export default App;
