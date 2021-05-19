import React from "react";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
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
      <GoogleAuth className="login-page" />
    </div>
  );
};

export default Dashboard;
