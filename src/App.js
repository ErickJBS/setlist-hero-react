import React, {useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import store from './redux/store';
import { Provider } from "react-redux";
import RegisterPage from './pages/register-page';
import LoginPage from './pages/login-page';
import LandingPage from './pages/landing-page';
import Cookies from 'js-cookie';
import './App.css';

const componentToTest = <><RegisterPage className="full-page" /></>;

function App() {
  const [jwtCookie, ] = useState(Cookies.get('jwt'));

  const renderRoutes = () => {
    return jwtCookie ?
      (
        <>
          <PrivateRoute exact path="/" to="/home" component={LandingPage} />
          <PrivateRoute exact path="/register" to="/home" component={LandingPage} />
          <PrivateRoute exact path="/login" to="/home" component={LandingPage} />
          <PrivateRoute exact path="/home" component={LandingPage}/>
        </>
      ) :
      (
        <>
          <Route exact path="/" to="/logIn" component={LoginPage} />
          <Route exact path="/test" render={() => componentToTest} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
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
