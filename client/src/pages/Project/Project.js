import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/projectsActions";
import { CLOSE_PROJECT } from "../../redux/actions/types";
import Header from "../../components/Header/Header";
// import DeleteProject from "../forms/project/DeleteProject/DeleteProject";
import "./Project.scss";

const Project = (props) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  // const [showEditProject,setShowEditProject]=useState(false);
  // redux store variables
  const user = useSelector((state) => state.user.info);
  const project = useSelector((state) => state.selectedProject);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const getProjectHandler = () => {
    dispatch(getProject(projectId));
  };

  const unmountProjectHandler = () => {
    dispatch({ type: CLOSE_PROJECT });
  };

  /*
  const deleteProjectOnOpenHandler = () => {
    setShowDeleteProject(true);
  };

  const deleteProjectOnCloseHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteProject(false);
  };

  const renderDeleteProject = () => {
    if (!showDeleteProject) return null;
    return (
      <DeleteProject project={project} onClose={deleteProjectOnCloseHandler} />
    );
  };

  const renderActionButtons = () => {
    if (!(user && user.id == project.creator.id)) return null;
    return (
      <>
        <button className="project-item__action-button">Edit</button>|
        <button
          className="project-item__action-button danger"
          onClick={deleteProjectOnOpenHandler}
        >
          Delete
        </button>
      </>
    );
  };
    */

  // retrieve the project from the database once after the component renders
  useEffect(() => {
    getProjectHandler();
    // this is a cleanup function when component is unmounted
    return () => {
      unmountProjectHandler();
    };
  }, []);

  return (
    <div className="project page-container">
      {" "}
      {/*- we already have this class in index.scss*/}
      {/*thanks
      we should list down everything we need to do first
      your turn to code
      - 1) fix those classes
      -  the page-container, right?
      - But not project__page ?

      */}
      <div className="project__content">
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
