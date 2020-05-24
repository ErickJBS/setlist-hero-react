import React, { useState } from 'react';
import logo from './logo.svg';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import store from './redux/store';
import { Provider } from "react-redux";
import RegisterPage from './pages/auth/register-page';
import LoginPage from './pages/auth/login-page';
import BandManagement from './pages/dashboard/band-management-page';
import Cookies from 'js-cookie';
import Dashboard from './pages/dashboard/dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/styles.css';
import './theme/animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

const componentToTest = <><RegisterPage className="full-page" /></>;

function App() {
  const [jwtCookie,] = useState(Cookies.get('jwt'));

  const renderRoutes = () => {
    return jwtCookie ?
      (
        <>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect from="/" to="/dashboard"/>
          </Switch>
        </>
      ) :
      (
        <>
          <Switch>
            <Route exact path="/" to="/login" component={LoginPage} />
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
