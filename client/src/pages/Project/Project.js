import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/projectsActions";
import { CLOSE_PROJECT } from "../../redux/actions/types";
import history from "../../history";
import Header from "../../components/Header/Header";
import DeleteProject from "../../components/forms/project/DeleteProject/DeleteProject";
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
    const onDeleteSuccessCb = () => {
      history.push("/dashboard");
    };
    return (
      <DeleteProject
        project={project}
        onClose={deleteProjectOnCloseHandler}
        onSuccessCb={onDeleteSuccessCb}
      />
    );
  };

  const renderDonorActionButtons = () => {
    // do not show these buttons if user is the creator
    if (user && project.creator && user.id == project.creator.id) return null;
    return (
      <>
        {/*note: I don't know if you were still working on the classes for these, but you can try to match the ones I have
        on a renderCreatorActionButtons
        */}
        <button className="project btn">Donate</button>
      </>
    );
  };

  const renderCreatorActionButtons = () => {
    // only show these buttons if user is the creator
    if (!(user && project.creator && user.id == project.creator.id))
      return null;
    return (
      <>
        <button className="project__action-button">Edit Project</button>
        <button
          className="project__action-button danger"
          onClick={deleteProjectOnOpenHandler}
        >
          Delete Project
        </button>
      </>
    );
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
    <>
      {renderDeleteProject()}
      <div className="project page-container">
        {/*note: I will let you finish fixing these classes because I'm going to focus on functionality related stuff for now.*/}
        <div className="project__details-container">
          <h1>Let's help Green Delight after lockdown</h1>
          <div className="main__right">
            <div className="main__right--card">
              {/* <div>Image: </div>*/}
              {/*note: if there are no h2 or h3, there should be no h4. the headings have semantic meaning and are not related to style */}
              {/*<h4>Project Name: {project.name}</h4>*/}
              <h2>Project Name: {project.name}</h2>
              <p>Description: {project.description}</p>
              <p>Amount Donated So Far: {project.amount_donated}</p>
              <p>Target Goal: {project.target_goal}</p>
            </div>
          </div>
        </div>
        <div className="project__actions-container">
          {renderDonorActionButtons()}
          {renderCreatorActionButtons()}
        </div>
        {/*
        note: I moved it from here to renderDonorActionButtons (L48-L50)
        <button className="project btn">Donate</button>
        */}
      </div>
    </>
  );
};

export default Project;
