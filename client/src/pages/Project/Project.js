import React, { useSelector } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProject } from "../../redux/actions/projectsActions";
import Header from "../../components/Header/Header";
import "./Project.scss";

const Project = (getProject, project) => {
  const getProjectHandler = () => {
    //add a guard to prevent errors if user is not loaded yet
    if (!project || !project.id) return null;
    getProject(project.id);
  };

  return (
    <div className="page">
      <h1>Let's help Green Delight after lockdown</h1>
      <div className="sidebar">
        <div className="main__right">
          <div className="main__right--card">
            <div>Image: </div>
            <button onClick={getProject()}>Get Project</button>
            <h4></h4>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
      <button className="project btn btn__share">Share</button>
      <button className="project btn">Donate</button>
    </div>
  );
};

export default Project;
