import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'
import "./styles.scss";
import styled from 'styled-components'


const AppDiv = styled.div`
  nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

`
//default to the login page, but have a nav that allows the user to access bubbles once they are logged in
function App() {
  return (
    <Router>
      <AppDiv>
        <nav>
          <span>
            <Link to ="/login">Login</Link>
          </span>
          <span>
            <Link to ="/bubbles">Bubbles!</Link>
          </span>
        </nav>
        <Switch>
          <PrivateRoute exact path = "/bubbles" component = {BubblePage} />
          <Route exact path="/" component={Login} />
          <Route component = {Login} />
          {/* 
            If the user is not logged in, we'll move them to the login page.
          */}
        </Switch>
      </AppDiv>
    </Router>
  );
}

export default App;
