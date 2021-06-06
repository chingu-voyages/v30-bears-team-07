import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "./history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
// react context
import { WindowContext } from "./AppContext";
import * as constants from "./utils/constants.js";
import "./normalize.css";
import "./index.scss";

// import "./App.scss";

const App = (props) => {
  // redux store variables
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const user = useSelector((state) => state.user.info);
  const isLoadingUser = useSelector((state) => state.auth.isLoading);
  // screen with variables
  const { NON_MOBILE_WIDTH, NON_MOBILE_HEIGHT } = constants;
  const [isNonMobileWidth, setIsNonMobileWidth] = useState(
    window.innerWidth >= NON_MOBILE_WIDTH
  );
  const [isNonMobileHeight, setIsNonMobileHeight] = useState(
    window.innerHeight >= NON_MOBILE_HEIGHT
  );

  const handleResize = () => {
    if (window.innerWidth >= NON_MOBILE_WIDTH) {
      setIsNonMobileWidth(true);
    } else {
      setIsNonMobileWidth(false);
    }
    if (window.innerHeight >= NON_MOBILE_HEIGHT) {
      setIsNonMobileHeight(true);
    } else {
      setIsNonMobileHeight(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    // cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWindowContextValue = () => {
    return { isNonMobileWidth, isNonMobileHeight };
  };

  // render
  return (
    <div id="app-outer-container" data-test="component-app">
      <ToastContainer />
      <Router history={history}>
        <WindowContext.Provider value={getWindowContextValue()}>
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
        </WindowContext.Provider>
      </Router>
    </div>
  );
};

export default App;
