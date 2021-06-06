import DefaultProjectImg from "../../assets/images/default-project-image.jpg";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../UIComponents/Card/Card";
import Modal from "../UIComponents/Modal/Modal";
import history from "../../history";
import DeleteProject from "../forms/project/DeleteProject/DeleteProject";
import "./ProjectItem.scss";

const ProjectItem = ({ project, className }) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  // const [showEditProject,setShowEditProject]=useState(false);
  // redux store variables
  const user = useSelector((state) => state.user.info);

  const getClassName = () => (className ? className : "");

  // handler functions
  const projectItemOnClickHandler = () => {
    history.push(`/projects/${project.id}`);
  };

  const deleteProjectOnOpenHandler = (e) => {
    e.stopPropagation();
    setShowDeleteProject(true);
  };

  const deleteProjectOnCloseHandler = () => {
    setShowDeleteProject(false);
  };

  const renderDeleteProject = () => {
    if (!showDeleteProject) return null;
    return (
      <DeleteProject project={project} onClose={deleteProjectOnCloseHandler} />
    );
  };

  const renderActionButtons = () => {
    console.log();
    if (
      !(user && (user.id == project.creator || user.id == project.creator.id))
    )
      return null;
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

  // render
  return (
    <>
      {renderDeleteProject()}
      <div
        className={`project-item ${getClassName()}`}
        onClick={projectItemOnClickHandler}
      >
        <Card className="project-item__content">
          <div className={`project-item__image ${getClassName()}}`}>
            <img
              src={project.image_url || DefaultProjectImg}
              alt="Project Image"
            />
          </div>
          <div className="project-item__info">
            <h2>{project.name}</h2>
            <h3>
              <span className="project-item__amount-donated">
                ${project.amount_donated}
              </span>{" "}
              / {project.target_goal} raised
            </h3>
            {/*note: should probably add the deadline for the project*/}
          </div>
          <div className="project-item__actions">{renderActionButtons()}</div>
        </Card>
      </div>
    </>
  );
};

export default ProjectItem;
