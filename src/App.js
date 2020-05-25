import React, { useState } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import store from './redux/store';
import { Provider } from "react-redux";
import RegisterPage from './pages/auth/register-page';
import LoginPage from './pages/auth/login-page';
import Cookies from 'js-cookie';
import Dashboard from './pages/dashboard/dashboard';
import HomePage from './pages/home-page';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/styles.css';
import './theme/animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const componentToTest = <><RegisterPage className="full-page" /></>;

function App() {
  const [jwtCookie,] = useState(Cookies.get('jwt'));

  const renderRoutes = () => {
    return jwtCookie ?
      (
        <>
          <Switch>
            <PrivateRoute path="/home" component={HomePage} />
            <Redirect from="/" to="/home"/>
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
