import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import "./Dashboard.scss";

const Dashboard = () => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <div>
      <section className="header">
        <div className="header__right">{/*<GoogleAuth />*/}</div>
      </section>
      <section className="main">
        <div className="main__left">
          <div className="main__left--info">
            <div>Settings</div>
            <div>Fundraiser</div>
            <div>Donations</div>
            <div>Info</div>
          </div>
        </div>
        <div className="main__right">
          {projects.map((el) => (
            <div className="main__right--card">
              <div>Image: </div>
              <h4>Let's Get Dorian and Louise Wed</h4>
              <p>Last Donation: 8 min ago</p>
              <p>$15,916 raised</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
