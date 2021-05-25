import React from "react";
import { Link } from "react-router-dom";
import Header from "../../pages/Header/Header";
import "./Project.scss";

const Project = () => {
  return (
    <div className="page">
      <h1>Let's help Green Delight after lockdown</h1>
      <div className="sidebar">
        <div className="main__right">
          <div className="main__right--card">
            <div>Image: </div>
            <h4>Let's help Green Delight</h4>
            <p>Last Donation: 8 min ago</p>
            <p>$15,916 raised</p>
          </div>
        </div>
      </div>
      <button className="btn btn--share">Share</button>
      <button className="btn">Donate</button>
    </div>
  );
};

export default Project;
