import React, { useState, useEffect } from "react";
import Login from "./Login";
import loginService from "../services/login";
import appService from "../services/users";
import { Link } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      appService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      appService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    alert("Logging out?");
  };

  if (user === null) {
    return (
      <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        message={message}
      />
    );
  }

  return (
    <div>
      <span>{`${user.name} has logged in`}</span>{" "}
      <button onClick={logout}>Logout</button>
      <Link to="/">Home Page</Link>
      <Link to="login">Login Page</Link>
      <Link to="dashboard">Dashboard Page</Link>
      <Link to="signup">Signup Page</Link>
    </div>
  );
};

export default Home;
