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
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} />
      <form className="login" onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>

      <GoogleAuth className="login-page" />
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
