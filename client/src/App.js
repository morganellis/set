import React, { Component } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { verify } from "./redux/auth";

import Header from "./Header/Header.js";
import Landing from "./Landing/Landing.js";
import Signup from "./Signup/Signup.js";
import Login from "./Login/Login.js";
import Instructions from "./Instructions/Instructions.js"
import Home from "./Home/Home.js";
import Game from "./Game/Game.js";
import Footer from "./Footer/Footer.js";
import Profile from "./Profile/Profile.js";
import ProtectedRoute from "./ProtectedRoute.js";
import "./App.css";


class App extends Component {
  componentDidMount() {
    this.props.verify();
  }
  render() {
    const { isAuthenticated, loading } = this.props;
    return (
      <div className="app-wrap">
        <Header />
        {loading ?
          <div>...Loading</div>
          :
          <Switch>
            <Route exact path="/" render={props => isAuthenticated ? <Redirect to="/home" /> : <Landing {...props} />} />
            <Route path="/signup" render={props => isAuthenticated ? <Redirect to="/home" /> : <Signup {...props} />} />
            <Route path="/login" render={props => isAuthenticated ? <Redirect to="/home" /> : <Login {...props} />} />
            <Route path="/instructions" component={Instructions} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/play" component={Game} /> } />
            </Switch>
        }
        <Footer />
      </div>
    )
  }
};

export default withRouter(connect(state => state.user, { verify })(App));
