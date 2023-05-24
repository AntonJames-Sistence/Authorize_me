import LoginFormPage from "./LoginFormPage/LoginFormPage";
import React from 'react';
import { Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;