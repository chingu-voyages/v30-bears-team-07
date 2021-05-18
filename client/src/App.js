import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./normalize.css";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FourOFour from "./pages/FourOFour";
import Dashboard from "./pages/Dashboard";
import ProjectsList from "./pages/ProjectsList";

const AppRoutes = () => (
  <Switch>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/projectslist">
      <ProjectsList />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
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
