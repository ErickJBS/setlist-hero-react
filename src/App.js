import React, { useState } from 'react';
import logo from './logo.svg';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import store from './redux/store';
import { Provider } from "react-redux";
import RegisterPage from './pages/register-page';
import LoginPage from './pages/login-page';
import LandingPage from './pages/landing-page';
import BandManagement from './pages/band-management-page';
import Cookies from 'js-cookie';
import './App.css';

const componentToTest = <><RegisterPage className="full-page" /></>;

function App() {
  const [jwtCookie,] = useState(Cookies.get('jwt'));

  const renderRoutes = () => {
    return jwtCookie ?
      (
        <>
          <Switch>
            <PrivateRoute exact path="/" to="/home" component={LandingPage} />
            <PrivateRoute exact path="/home" component={LandingPage} />
            <PrivateRoute exact path="/manage-bands" component={BandManagement} />
            <Redirect to="/"/>
          </Switch>
        </>
      ) :
      (
        <>
          <Switch>
            <Route exact path="/" to="/logIn" component={LoginPage} />
            <Route exact path="/test" render={() => componentToTest} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Redirect to="/" />
          </Switch>
        </>
      )
  }
  console.log(jwtCookie);

  return (
    <Provider store={store}>
      <Router>
        {renderRoutes()}
      </Router>
    </Provider>
  );
}

export default App;
