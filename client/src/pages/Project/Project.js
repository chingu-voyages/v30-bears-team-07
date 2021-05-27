import React, { useSelector } from "react";
import { Link } from "react-router-dom";
import { getProject } from "../../redux/actions/projectsActions";
import Header from "../../components/Header/Header";
import "./Project.scss";

const Project = () => {
  // retrieve the project from the backend after rendering

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
      <button className="project btn btn__share">Share</button>
      <button className="project btn">Donate</button>
    </div>
  );
};

export default Project;
