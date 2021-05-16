import React from "react";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import Notification from "../Notification/Notification";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  message,
}) => {
  return (
    <div className="auth page-container">
      {/*note: I did some reordering on the elements, hope it works and nothing bugs out (-tella)*/}
      <form className="auth__form" onSubmit={handleLogin}>
        <h1 className="auth__heading-title">Login</h1>
        <Notification message={message} />
        <div className="textfield-container">
          <label htmlFor="auth__username" className="textfield-label">
            Username
          </label>
          <input
            type="text"
            // note: sorry for changing this, I wanted to do some styling, but I'm not sure if anything is dependent on id.
            // feel free to put it back
            // id="username"
            id="auth__username"
            className="textfield-input"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="textfield-container">
          <label htmlFor="auth__password" className="textfield-label">
            Password
          </label>
          <input
            type="password"
            // note: sorry for changing this, I wanted to do some styling, but I'm not sure if anything is dependent on id.
            // feel free to put it back
            // id="username"
            id="auth__password"
            className="textfield-input"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="form-button-container">
          <button
            className="form-button submit"
            id="login-button"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="form-button-container">
          <GoogleAuth className="login-page" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

//
//
// Going to add this for later (tella - 5/15/21)
/*
  <form id="login-form" autoComplete="off">
      <div className="login form-content-container">
        <div className="door-title-container">
          <h2 className="heading">Login</h2>
        </div>
        {renderErrorNotifications()}
        <div className="textfield-container">

        </div>
        <div className="textfield-container">

        </div>

        <div className="form-button-container">
          <button
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Sign In
          </button>
        </div>
        <Link
          id="register-text-link"
          className="small-text-link"
          to={`/auth/register`}
        >
          Don't have an account? Register here.
        </Link>
      </div>
    </form>
*/
