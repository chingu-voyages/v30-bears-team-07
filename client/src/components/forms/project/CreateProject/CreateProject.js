import React from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createProject } from "../../../../flux/actions/roomsActions";

import { renderError, getErrorClass } from "../../../../helpers";
import ErrorNotifications from "../../../ErrorNotifications/ErrorNotifications";
import Modal from "../../UIComponents/Modal/Modal";
import ReduxInput from "../../UIComponents/FormElements/ReduxInput/ReduxInput";

// import { actionShowLoader } from "../../../../flux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";

const CreateProject = (props) => {
  // submit handler
  const onSubmit = async (formValues) => {
    const createProjectSuccessCb = () => {
      props.onModalClose();
    };
    console.log(formValues);
    // run an action
    props.actionShowLoader("createProjectModalForm", true);
    await props.createProject(formValues, createProjectSuccessCb);
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
    return <LoadingSpinner showLoader={props.showLoader} />;
  };

  const renderContent = () => {
    return (
      <Modal
        componentClass="create-project"
        headerClassName="settings-page-sidebar-header"
        headingText="Create a Project"
        onModalClose={() => {
          props.onModalClose();
        }}
        actionButtons={
          <button
            id="create-project-submit"
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Create Project
          </button>
        }
      >
        <form id="create-project-form" autoComplete="off">
          <div className="create-project form-content-container modal-form-content">
            {renderErrorNotifications()}
            <Field
              name="name"
              component={<ReduxInput />}
              type="text"
              props={{
                inputProps: {
                  placeholder: "Project Name",
                  className: "textfield-input",
                  maxLength: "30",
                  autoComplete: "off",
                  id: "create-project-name-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "textfield-label",
                  text: "Project Name *",
                  id: "create-project-name-label",
                },
              }}
            />
          </div>
          <button
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
            style={{ display: "none" }}
          >
            Save
          </button>
        </form>
      </Modal>
    );
  };

  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("modal")
  );
};

const validate = (formValues) => {
  console.log(formValues);

  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input a room name.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  showLoader: state.loader.showCreateProjectFormLoader,
});

const createProjectModalComponent = connect(mapStateToProps, {
  actionShowLoader,
  createProject,
})(CreateProject);

export default reduxForm({
  form: "createProjectModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(createProjectModalComponent);

/*
const <ReduxInput /> = ({ input, meta, inputProps, labelProps }) => {
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.class || null;
  const labelId = labelProps.id || null;
  return (
    <React.Fragment>
      <label
        htmlFor={inputProps.id}
        className={`${errorClass} ${labelClass}`}
        id={labelId || ""}
      >
        {labelProps.text}
      </label>
      <input
        {...inputProps}
        {...input}
        className={`${inputProps.className} ${errorClass}`}
        onKeyDown={(e) => {
          handleEnterKeyOnField(e);
        }}
        onInput={(e) => {
          onInput(e);
        }}
        autoFocus={inputProps.autoFocus || false}
      />
      {renderError(meta, "create-project")}
    </React.Fragment>
  );
};
*/
