import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";

// note: Home page definitely needs to be revamped way later on (Tella)
// import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
// note: Signup page definitely needs to be revamped way later on (Tella)
// import Signup from "./pages/Signup/Signup";
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
// import CancelProject from "./components/forms/project/CancelProject/CancelProject";

import "./normalize.css";
import "./index.scss";
// import "./App.scss";

const App = ({ isSignedIn, user }) => {
  return (
    <div id="app-outer-container" data-test="component-app">
      <Router history={history}>
        <Route path="/" exact>
          <Redirect to={isSignedIn ? `/dashboard` : "/login"} />
        </Route>
        {isSignedIn ? <Header /> : null}
        <div style={{ display: "none" }}>
          <GoogleAuth />
        </div>
        <UnauthenticatedRoute path="/login" exact>
          <Login />
        </UnauthenticatedRoute>
        <AuthenticatedRoute path="/dashboard" exact>
          <Dashboard />
        </AuthenticatedRoute>
        <Route path="/allprojects" exact>
          <AllProjects />
        </Route>
        <Route path="/projects/:projectId" exact>
          <Project />
        </Route>
        {/*note: to be added in the future, this Sprint or the next one (Tella) 
          <Route path="/projects/:projectId/checkout" exact>
            <Checkout />
          </Route>
        */}

        {/*note: these are all of the pages that need to be worked on way later on
          currently, they're not supposed to be used for now (Tella)

          <Home />

          <UnauthenticatedRoute path="/signup" exact>
            <Signup />
          </UnauthenticatedRoute>

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
