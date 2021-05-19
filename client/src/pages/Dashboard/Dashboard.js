import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <div className="wrapper">
      <section className="header">
        <p>Crowdfund</p>
        <div className="header__right">
          <p>About</p>
          <p>Discover</p>
          <p>Get Started</p>
        </div>
      </section>
      <section className="main">
        <div className="main__left">
          <div className="main__left--info">
            <p>Settings</p>
            <p>Fundraiser</p>
            <p>Donations</p>
            <p>Payment Infos</p>
          </div>
        </div>
        <div className="main__right">
          {projects.map((el) => (
            <div className="main__right--card">
              <div>Image: </div>
              <div>Text: </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
