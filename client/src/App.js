import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import GoogleAuth from "./components/GoogleAuth/GoogleAuth";
// Used for URL redirection based on authentication status
import AuthenticatedRoute from "./routeWrappers/AuthenticatedRoute";
import UnauthenticatedRoute from "./routeWrappers/UnauthenticatedRoute";

import "./normalize.css";
import "./index.scss";
// import "./App.scss";

const App = ({ isSignedIn, user }) => {
  return (
    <div id="app-outer-container" data-test="component-app">
      <Router history={history}>
        <Switch>
          <UnauthenticatedRoute path="/signup" exact>
            <Signup />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path="/login" exact>
            <Login />
          </UnauthenticatedRoute>
          <AuthenticatedRoute path="/users/:userId/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <Route path="/" exact>
            <Redirect
              to={isSignedIn ? `/users/${user.id}/dashboard` : "/login"}
            />
          </Route>
          {/* Note: We don't have a real home page yet (tella)
          <Route exact path="/">
          <Home />
        </Route>
        */}
          <Route path="*">
            <ErrorPage errorType="404" />
          </Route>
          {/* Note: This is necessary to initialize google auth data ahead of time (tella)
            This will not showup and can not be interacted with, so don't worry
              PLEASE DO NOT DELETE
          */}
          <div style={{ display: "none" }}>
            <GoogleAuth />
          </div>

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
