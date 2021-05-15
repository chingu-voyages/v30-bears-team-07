import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./normalize.css";
import "./index.css";
import "./App.scss";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
// Used for URL redirection based on authentication status
import AuthenticatedRoute from "./routeWrappers/AuthenticatedRoute";
import UnauthenticatedRoute from "./routeWrappers/UnauthenticatedRoute";

const AppRoutes = () => (
  <Switch>
    <UnauthenticatedRoute path="/signup" exact>
      <Signup />
    </UnauthenticatedRoute>
    <UnauthenticatedRoute path="/login" exact>
      <Login />
    </UnauthenticatedRoute>
    <Route path="/dashboard">
      <Dashboard />
    </Route>

    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <ErrorPage errorType="404" />
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
);

const App = () => {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
