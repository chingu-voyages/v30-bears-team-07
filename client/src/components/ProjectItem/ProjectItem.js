import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../UIComponents/Card/Card";
import Modal from "../UIComponents/Modal/Modal";
import DeleteProject from "../forms/project/DeleteProject/DeleteProject";
import "./ProjectItem.scss";

const ProjectItem = ({ project }) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  // const [showEditProject,setShowEditProject]=useState(false);
  // redux store variables
  const user = useSelector((state) => state.user.info);

  // handler functions
  const deleteProjectOnOpenHandler = () => {
    setShowDeleteProject(true);
  };

  const deleteProjectOnCloseHandler = () => {
    setShowDeleteProject(false);
  };

  const renderDeleteProject = () => {
    if (!showDeleteProject) return null;
    return <DeleteProject project={project} />;
  };

  // render
  return (
    <>
      {renderDeleteProject()}
      <li className="project-item">
        <Card className="project-item__content">
          <div className="project-item__image">
            {/*<img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />*/}
          </div>
          <div className="project-item__info">
            <h2>{project.name}</h2>
            <h3>{project.amount_donated}</h3>
            <h3>Target Goal:{project.target_goal}</h3>
          </div>
          <div className="project-item__actions">
            {user && user.id == project.creator.id && <button>Edit</button>}

            {user && user.id == project.creator.id && (
              <button onClick={deleteProjectOnOpenHandler}>Delete</button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default ProjectItem;
