import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/projectsActions";
import { CLOSE_PROJECT } from "../../redux/actions/types";
import Header from "../../components/Header/Header";
import "./Project.scss";

const Project = (props) => {
  // state variables
  const project = useSelector((state) => state.selectedProject);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const getProjectHandler = () => {
    dispatch(getProject(projectId));
  };

  const unmountProjectHandler = () => {
    dispatch({ type: CLOSE_PROJECT });
  };

  // retrieve the project from the database once after the component renders
  useEffect(() => {
    getProjectHandler();
    // this is a cleanup function when component is unmounted
    return () => {
      unmountProjectHandler();
    };
  }, []);

  return (
    <div className="page">
      <div className="content">
        <h1>Let's help Green Delight after lockdown</h1>
        <div className="main__right">
          <div className="main__right--card">
            {/* <div>Image: </div>*/}
            <h4>Project Name: {project.name}</h4>
            <p>Description: {project.description}</p>
            <p>Amount Donated So Far: {project.amount_donated}</p>
            <p>Target Goal: {project.target_goal}</p>
          </div>
        </div>
      </div>
      <button className="project btn btn__share">Share</button>
      <button className="project btn">Donate</button>
    </div>
  );
};

export default Project;
