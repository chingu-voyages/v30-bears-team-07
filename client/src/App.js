import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";

import Home from "./pages/Home/Home";
import Header from "./pages/Header/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllProjects from "./pages/AllProjects/AllProjects";
import Project from "./pages/Project/Project";
import GoogleAuth from "./components/GoogleAuth/GoogleAuth";
// Used for URL redirection based on authentication status
import AuthenticatedRoute from "./routeWrappers/AuthenticatedRoute";
import UnauthenticatedRoute from "./routeWrappers/UnauthenticatedRoute";

//Note: Just using this for testing, feel free to remove (tella)
// import Modal from "./components/UIComponents/Modal/Modal";
// import CreateProject from "./components/forms/project/CreateProject/CreateProject";
// import DeleteProject from "./components/forms/project/DeleteProject/DeleteProject";
import CancelProject from "./components/forms/project/CancelProject/CancelProject";

import "./normalize.css";
import "./index.scss";
// import "./App.scss";

const App = ({ isSignedIn, user }) => {
  return (
    <div id="app-outer-container" data-test="component-app">
      <Router history={history}>
        <Route path="/" exact>
          <Redirect
            to={isSignedIn ? `/users/${user.id}/dashboard` : "/login"}
          />
        </Route>
        {isSignedIn ? <Header /> : null}
        <div style={{ display: "none" }}>
          <GoogleAuth />
        </div>
        <UnauthenticatedRoute path="/signup" exact>
          <Signup />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/login" exact>
          <Login />
        </UnauthenticatedRoute>
        <AuthenticatedRoute path="/users/:userId/dashboard" exact>
          <Dashboard />
        </AuthenticatedRoute>
        <Route path="/allprojects" exact>
          <AllProjects />
        </Route>
        <Route path="/project" exact>
          <Project />
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
