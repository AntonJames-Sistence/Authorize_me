import LoginFormPage from './components/LoginFormPage/LoginFormPage.jsx'
import React from 'react';
import { Route, Switch} from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage/SignupFormPage.jsx';
import Navigation from './components/Navigation/Navigation.jsx';

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;