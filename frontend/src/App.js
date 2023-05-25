import LoginForm from './components/LoginFormModal/LoginForm.jsx'
import React from 'react';
import { Route, Switch} from 'react-router-dom';
import SignupFormPage from './components/SignupFormModal/SignupForm.jsx';
import Navigation from './components/Navigation/index.js';

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
    </>
  );
}

export default App;