import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <p>Dashboard Page</p>
      <Link to="/">Home Page</Link>
      <Link to="login">Login Page</Link>
      <Link to="dashboard">Dashboard Page</Link>
      <Link to="signup">Register Page</Link>
    </div>
  );
};

export default Dashboard;
