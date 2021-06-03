import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
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

import "./normalize.css";
import "./index.scss";
// import "./App.scss";

const App = (props) => {
  // state variables
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const user = useSelector((state) => state.user.info);
  const isLoadingUser = useSelector((state) => state.auth.isLoading);

  // render
  return (
    <div id="app-outer-container" data-test="component-app">
      <Router history={history}>
        <Route path="/" exact>
          <Redirect to={isSignedIn ? `/dashboard` : "/login"} />
        </Route>
        <Header />
        <div style={{ display: "none" }}>
          <GoogleAuth />
        </div>
        <Switch>
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
          <Route>
            <ErrorPage errorType="404" />
          </Route>
        </Switch>
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

export default App;
