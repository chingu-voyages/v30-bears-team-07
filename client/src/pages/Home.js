import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Test page app</p>
      <p>Amazing App Coming Soon!</p>
      <Link to="/">Home Page</Link>
      <Link to="login">Login Page</Link>
      <Link to="dashboard">Dashboard Page</Link>
      <Link to="signup">Signup Page</Link>
    </div>
  );
};

export default Home;
