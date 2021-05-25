import "./CancelProject.scss";

import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { leaveProject } from "../../../flux/actions/projectsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

const CancelProject = (props) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.actionShowLoader("leaveProjectForm", true);
    props.leaveProject(props.project._id, props.redirectToHomeUponRemovalCb);
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
        componentClass="leave-project"
        onModalClose={() => {
          console.log("closing leave-project modal");
          props.onClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Leave Project"
        autoFocusOnCancel={true}
        actionButtons={
          <button
            id="leave-project-submit"
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={onSubmitHandler}
          >
            {renderLoader()} Leave Project
          </button>
        }
      >
        <form
          id="leave-project-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="leave-project form-content-container modal-form-content">
            <p className="modal-paragraph leave-project">
              Are you sure you want to leave this project?
            </p>
            <p className="modal-paragraph leave-project enlarged-text centered">
              {props.project.name}
            </p>

            {renderErrorNotifications()}
          </div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            style={{ display: "none" }}
          >
            Leave Project
          </button>
        </form>
      </Modal>
    </React.Fragment>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  error: state.error,
  showLoader: state.loader.showCancelProjectFormLoader,
});

export default connect(mapStateToProps, {
  leaveProject,
  actionShowLoader,
})(CancelProject);

{
  /* <p
  id="leave-project-description-paragraph"
  className="modal-paragraph small-text leave-project"
>
  Warning: Deleted projects cannot be restored.
</p>; */
}

// // submit handler
// const onSubmit = async (formValues) => {
//   console.log(formValues);
//   props.actionShowLoader("leaveProjectForm", true);
//   await props.leaveProject(formValues);
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
