import DefaultProjectImg from "../../assets/images/default-project-image.jpg";

import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { getProject } from "../../redux/actions/projectsActions";
import { CLOSE_PROJECT } from "../../redux/actions/types";

import history from "../../history";
import { capitalizeFirstLetter } from "../../helpers";
import DeleteProject from "../../components/forms/project/DeleteProject/DeleteProject";
import DonateForm from "../../components/forms/project/DonateForm/DonateForm";
import "./Project.scss";

const Project = (props) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);

  // redux store variables
  const user = useSelector((state) => state.user.info);
  const project = useSelector((state) => state.selectedProject);
  const dispatch = useDispatch();
  // react-router constants
  const { projectId } = useParams();
  const location = useLocation();
  const { checkoutStatus } = queryString.parse(location.search);

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

  const renderNotification = ({ message, type, onOpenCb, onCloseCb }) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onOpen: () => {
        if (onOpenCb) onOpenCb();
      },
      onClose: () => {
        if (onCloseCb) onCloseCb();
      },
    });
  };

  const removeQuery = () => {
    history.push(`/projects/${projectId}`);
  };

  const donateSuccessQueryHandler = () => {
    // do not run this function if status is not success
    if (checkoutStatus !== "completed") return null;
    // send a notification that the project donation succeeded
    renderNotification({
      message: "Payout for donation successful!",
      type: "completed",
      onOpenCb: removeQuery,
    });
  };

  const donateCancelQueryHandler = () => {
    // do not run this function if status is not canceled
    if (checkoutStatus !== "canceled") return null;
    // send a notification that the project donation succeeded
    renderNotification({
      message: "Donation checkout canceled...",
      type: "error",
      onOpenCb: removeQuery,
    });
  };

  //check the location URL if there are any donation related queries
  useEffect(() => {
    donateSuccessQueryHandler();
    donateCancelQueryHandler();
    /*return () => {}*/
  }, [location.search]);

  // event action handlers
  const deleteProjectOnOpenHandler = () => {
    setShowDeleteProject(true);
  };

  const deleteProjectOnCloseHandler = (e) => {
    setShowDeleteProject(false);
  };

  const donateButtonOnClickHandler = () => {
    setShowDonateForm(true);
  };

  // class and styling methods
  const getProjectStatusClass = () => {
    if (!project || !project.status) return "";
    return project.status;
  };

  // render methods
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
        <button
          className="project__button cta"
          onClick={donateButtonOnClickHandler}
        >
          Donate
        </button>
      </>
    );
  };

  const renderCreatorActionButtons = () => {
    // only show these buttons if user is the creator
    if (!(user && project.creator && user.id == project.creator.id))
      return null;
    return (
      <>
        <button className="project__button">Edit Project</button>
        <button
          className="project__button danger"
          onClick={deleteProjectOnOpenHandler}
        >
          Delete Project
        </button>
      </>
    );
  };

  // conditionally render action buttons depending on whether donate form is shown
  const renderActionButtons = () => {
    if (showDonateForm) return null;
    return (
      <div className="project__actions-container">
        {renderDonorActionButtons()}
        {renderCreatorActionButtons()}
      </div>
    );
  };

  //conditionally render the donate form only after clicking the donate buttons
  const renderDonateForm = () => {
    if (!showDonateForm) return null;
    return (
      <div className="project__actions-container">
        <DonateForm project={project} />
      </div>
    );
  };

  const renderProjectDetails = () => {
    if (!project.id) return <h1>Loading Project...</h1>;
    return (
      <>
        <h1>{project.name} </h1>
        <p>
          <span className="project__amount-donated">
            ${project.amount_donated}
          </span>{" "}
          / {project.target_goal} raised.
        </p>
        <p className={`project__status ${getProjectStatusClass()}`}>
          Status: {capitalizeFirstLetter(project.status)}
        </p>

        <img
          className="project__image"
          src={project.image_url || DefaultProjectImg}
          alt="Project Image"
        />

        <p className="project__description">{project.description}</p>
      </>
    );
  };

  // component render
  return (
    <>
      {renderDeleteProject()}
      <div className="project page-container">
        <div className="project__flex-outer-container">
          <div className="project__details-container">
            {renderProjectDetails()}
          </div>
          {renderActionButtons()}
          {renderDonateForm()}
        </div>
      </div>
    </>
  );
};

export default Project;
