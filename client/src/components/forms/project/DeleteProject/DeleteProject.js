import "./DeleteProject.scss";

import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { deleteProject } from "../../../flux/actions/projectsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

const DeleteProject = (props) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.actionShowLoader("deleteProjectForm", true);
    props.deleteProject(props.project._id, props.redirectToHomeUponRemovalCb);
  };

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  const renderLoader = () => {
    return <LoadingSpinner className="white" showLoader={props.showLoader} />;
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="delete-project"
        onModalClose={() => {
          console.log("closing delete-project modal");
          props.onClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Delete Project"
        autoFocusOnCancel={true}
        actionButtons={
          <button
            id="delete-project-submit"
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={onSubmitHandler}
          >
            {renderLoader()} Delete Project
          </button>
        }
      >
        <form
          id="delete-project-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="delete-project form-content-container modal-form-content">
            <p className="modal-paragraph delete-project">
              Are you sure you want to delete this project?
            </p>
            <p className="modal-paragraph delete-project enlarged-text centered">
              {props.project.name}
            </p>
            <p
              id="delete-project-description-paragraph"
              className="modal-paragraph small-text delete-project"
            >
              Warning: Deleted projects cannot be restored.
            </p>

            {renderErrorNotifications()}
          </div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            style={{ display: "none" }}
          >
            Delete Project
          </button>
        </form>
      </Modal>
    </React.Fragment>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  showLoader: state.loader.showDeleteProjectFormLoader,
});

export default connect(mapStateToProps, {
  deleteProject,
  actionShowLoader,
})(DeleteProject);

// // submit handler
// const onSubmit = async (formValues) => {
//   console.log(formValues);
//   props.actionShowLoader("deleteProjectForm", true);
//   await props.deleteProject(formValues);
// };

// const validate = (formValues) => {
//   console.log(formValues);
//   const errors = {};
//   return errors;
// };

// export default reduxForm({
//   form: "deleteAccount",
//   keepDirtyOnReinitialize: true,
//   enableReinitialize: true,
//   validate,
// })(deleteAccount);
