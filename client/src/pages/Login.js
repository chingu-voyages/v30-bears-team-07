import React from "react";
import Notification from "./Notification";

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
    </div>
  );
};

export default LoginForm;
