import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllProjects from "./pages/AllProjects/AllProjects";
import GoogleAuth from "./components/GoogleAuth/GoogleAuth";
// Used for URL redirection based on authentication status
import AuthenticatedRoute from "./routeWrappers/AuthenticatedRoute";
import UnauthenticatedRoute from "./routeWrappers/UnauthenticatedRoute";

import "./normalize.css";
import "./index.scss";
// import "./App.scss";

const App = ({}) => {
  return (
    <div id="app-outer-container" data-test="component-app">
      <Router history={history}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/allprojects">
            <AllProjects />
          </Route>

          {/*
    Note:
    Feel free to use this if the URL redirecting is getting annoying
    for development (-tella)

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    */}
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoadingUser: state.auth.isLoading,
  isSignedIn: state.auth.isSignedIn,
  user: state.user.info,
});

export default connect(mapStateToProps, {})(App);
