import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authSignIn, authSignOut } from "../../flux/actions/authActions";
import history from "../../history";

class GoogleAuth extends React.Component {
  _isMounted = false;
  state = {
    initialized: false,
  };

  componentDidMount() {
    this._isMounted = true;
    console.log(`ismounted is now ${this._isMounted}`);

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // this is a more secure version of doing it, where you use .env file in root, and define variables
          // clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          // note: I only put it like this because I rushed getting the component working (-Tella)
          clientId:
            "269391989927-jtmcdqeo0h2l3t4q8gvpieamjkm8a4he.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // gives a ref to the auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
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
  }

  onAuthChange = async (isSignedIn) => {
    // set the sign-in check to false
    // if (this.context.authSignInChecked) {
    //   this.context.userHasAuthenticated(false);
    // }
    // this.context.showLoaderBeforeCheck();
    // sign in or sign out
    if (isSignedIn) {
      await this.props.authSignIn({
        authMethod: "googleAuth",
        userId: this.auth.currentUser.get().getId(),
      });
      // this.context.userHasAuthenticated(true);
    } else {
    }
    // make the loader fade after changing sign in status
    // this.context.setAuthSignInChecked(true);
    // this.context.fadeLoaderAfterCheck();
  };

  onSignInClick = () => {
    this.auth.signIn();
    // this.context.userHasAuthenticated(true);
  };

  onSignOutClick = async () => {
    await this.auth.signOut();
    await this.props.authSignOut();
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
        {/*should replace this with a functional Google logo*/}
        <i className="google icon" />
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

export default connect(mapStateToProps, { authSignIn, authSignOut })(
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
      await props.authSignIn({
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
    // await props.authSignOut();

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

export default connect(mapStateToProps, { authSignIn, authSignOut })(
  GoogleAuth
);

*/

/*
5/14/21
// this is related to loader stuff  for the future, do not remove
// set the sign-in check to false
if (context.authSignInChecked) {
  context.userHasAuthenticated(false);
}
context.showLoaderBeforeCheck();

// make the loader fade after changing sign in status
context.setAuthSignInChecked(true);
context.fadeLoaderAfterCheck();

// after signing in
context.userHasAuthenticated(true);
*/
