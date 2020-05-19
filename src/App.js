import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import store from './redux/store';
import { Provider } from "react-redux";
import RegisterPage from './pages/register-page';
import './pages/pages.css'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Route exact path="/test" render={() => <><RegisterPage className="full-page"/></>}/>
        </>
      </Router>
    </Provider>
  );
}

export default App;
