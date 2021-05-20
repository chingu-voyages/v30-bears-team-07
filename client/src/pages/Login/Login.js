import React from "react";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

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
      <form
        className="auth__form"
        onSubmit={(e) => {
          // Note: Remove any form submission for now, because this does not function (tella)
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h1 className="auth__heading-title">Login</h1>

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
            disabled
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
            disabled
          />
        </div>
        <div className="form-button-container">
          <button
            className="form-button submit"
            id="login-button"
            type="submit"
            disabled
          >
            Login
          </button>
          <div className="form-button-container">
            <GoogleAuth className="login-page" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

// Note: just putting away currently unused stuff (tella)

// import e from "cors";
// import Notification from "../Notification/Notification";
// <Notification message={message} />
