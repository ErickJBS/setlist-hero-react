import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import store from './redux/store';
import { Provider } from "react-redux";
import RegisterPage from './pages/register-page';
import LoginPage from './pages/login-page';

import './pages/pages.css'

import './App.css';

const componentToTest = <><RegisterPage className="full-page"/></>;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Route exact path="/test" render={() => componentToTest}/>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </>
      </Router>
    </Provider>
  );
}

export default App;
