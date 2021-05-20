import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { googleSignIn, googleSignOut } from "../../flux/actions/authActions";
import history from "../../history";
// Style related imports
import "./GoogleAuth.scss";
import GoogleIconImg from "../../icons/google-icon.png";

class GoogleAuth extends React.Component {
  _isMounted = false;
  previousSignedInState = null;
  state = {
    initialized: false,
  };

  componentDidMount() {
    this._isMounted = true;
    console.log(`ismounted is now ${this._isMounted}`);

    // load the Google auth client
    window.gapi.load("client:auth2", () => {
      // initialize the client settings
      window.gapi.client
        .init({
          // Retrieve client ID from .env file on /client
          clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          // gives a ref to the auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log("initialized auth instance");
          // update redux state, check if user is signed in or not
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen for any changes in sign in status, update state
          this.auth.isSignedIn.listen(this.onAuthChange);
          // change the state so that it knows that it finished initializing

          console.log(`ismounted is now ${this._isMounted}`);
          if (this._isMounted) {
            this.setState({ initialized: true });
          }
        });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
    console.log(`ismounted is now ${this._isMounted}`);
    // this.auth.disconnect();
  }

  onAuthChange = async (isSignedIn) => {
    // set the sign-in check to false
    // if (this.context.googleSignInChecked) {
    //   this.context.userHasAuthenticated(false);
    // }
    // this.context.showLoaderBeforeCheck();
    // sign in or sign out

    if (isSignedIn /* && this.previousSignedInState !== isSignedIn */) {
      // Update previousSignedInState

      const currentUser = this.auth.currentUser.get();
      const userProfile = currentUser.getBasicProfile();
      const fullname = userProfile.getName();
      const email = userProfile.getEmail();
      console.log(`user profile is ${userProfile}`);
      console.log(userProfile);

      await this.props.googleSignIn({
        userId: currentUser.getId(),
        username: fullname.trim(),
        email: email,
      });

      // this.context.userHasAuthenticated(true);
    } else {
    }
    console.log(this.previousSignedInState);
    console.log(isSignedIn);
    this.previousSignedInState = isSignedIn;
    // make the loader fade after changing sign in status
    // this.context.setgoogleSignInChecked(true);
    // this.context.fadeLoaderAfterCheck();
  };

  onSignInClick = () => {
    this.auth.signIn();
    // this.context.userHasAuthenticated(true);
  };

  onSignOutClick = async () => {
    await this.auth.signOut();
    await this.props.googleSignOut();
    history.push("/login");
    // this.context.userHasAuthenticated(false);
  };

  renderGoogleSignButton = (text, cb) => {
    return (
      <button
        className={`ui primary google button ${this.props.className || null}`}
        id={this.props.buttonId || ""}
        onClick={() => {
          if (cb) {
            cb();
          }
        }}
      >
        <img
          className="google-icon-button-img"
          src={GoogleIconImg}
          alt="Google Icon"
        />
        {text}
      </button>
    );
  };

  renderAuthButton = () => {
    if (!this.state.initialized) {
      console.log("rendering null until auth state is initialized");
      return null;
    }
    if (this.props.isSignedIn) {
      return (
        <button
          className={`ui primary google button ${this.props.className || null}`}
          onClick={this.onSignOutClick}
        >
          Logout
        </button>
      );
    } else {
      return this.renderGoogleSignButton("Sign In w/ Google", () => {
        this.onSignInClick();
      });
    }
  };

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    authMethod: state.auth.authMethod,
  };
};

export default connect(mapStateToProps, { googleSignIn, googleSignOut })(
  GoogleAuth
);

// note: please do not delete the stuff below because I am trying to implement GoogleAuth as a functional component
// currently it only works as a class component, which does not match with the rest of the application
// (-Tella - 5/14/21)

/*
const GoogleAuth = (props) => {
  const [isMounted, setIsMounted] = useState("false");
  const [initialized, setInitialized] = useState("false");
  // non-dom related
  let _isMounted = false;
  let auth = null;

  const initializeAuth = () => {
    // don't let the setup run again
    if (_isMounted === true) return;
    setIsMounted(true);
    console.log("component is now mounted");
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // this is a more secure version of doing it, where you use .env file in root, and define variables
          // clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          clientId:
            "269391989927-jtmcdqeo0h2l3t4q8gvpieamjkm8a4he.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          console.log("does it make it here?");
          // gives a ref to the auth instance
          auth = window.gapi.auth2.getAuthInstance();
          console.log(auth);
          // update redux state, check if user is signed in or not
          onAuthChange(auth.isSignedIn.get());
          // listen for any changes in sign in status, update state
          auth.isSignedIn.listen(onAuthChange);
          // change the state so that it knows that it finished initializing

          console.log(`ismounted is now ${_isMounted}`);
          if (_isMounted) {
            setInitialized(true);
          }
        });
    });
  };

  const initializeAuthCleanup = () => {
    _isMounted = false;
    console.log(`ismounted is now ${_isMounted}`);
  };

  useEffect(() => {
    initializeAuth();
    // cleanup function
    return () => {
      initializeAuthCleanup();
    };
  }, [auth, _isMounted]);

  const onAuthChange = async (isSignedIn) => {
    // sign in or sign out
    if (isSignedIn) {
      await props.googleSignIn({
        authMethod: "googleAuth",
        userId: auth.currentUser.get().getId(),
      });
      const currentUser = auth.currentUser.get();
      const userProfile = currentUser.getBasicProfile();
      const fullname = userProfile.getName();
      console.log("user is now signed in");
      console.log("the name of user is:");
      console.log(fullname);
    }
  };

  const onSignInClick = () => {
    // if (!auth) return null;
    auth.signIn();
  };

  const onSignOutClick = async () => {
    // if (!auth) return null;
    await auth.signOut();
    history.push("/login");
    // await props.googleSignOut();

    // userHasAuthenticated(false);
  };

  const renderGoogleSignButton = (text, cb) => {
    return (
      <button
        className={`ui primary google button ${props.className || null}`}
        id={props.buttonId || ""}
        onClick={() => {
          if (cb) {
            cb();
          }
        }}
      >
        <i className="google icon" />
        {text}
      </button>
    );
  };

  const renderAuthButton = () => {
    if (!initialized) {
      console.log("rendering null until auth state is initialized");
      return null;
    }
    if (props.isSignedIn) {
      return (
        <button
          id="nav-menu-logout-button"
          onClick={onSignOutClick}
          className={`left item nav-item`}
        >
          Logout
        </button>
      );
    } else {
      return renderGoogleSignButton("Sign In w/ Google", () => {
        onSignInClick();
      });
    }
  };

  return renderAuthButton();
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    authMethod: state.auth.authMethod,
  };
};

export default connect(mapStateToProps, { googleSignIn, googleSignOut })(
  GoogleAuth
);

*/

/*
5/14/21
// this is related to loader stuff  for the future, do not remove
// set the sign-in check to false
if (context.googleSignInChecked) {
  context.userHasAuthenticated(false);
}
context.showLoaderBeforeCheck();

// make the loader fade after changing sign in status
context.setgoogleSignInChecked(true);
context.fadeLoaderAfterCheck();

// after signing in
context.userHasAuthenticated(true);
*/
