import React from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createProject } from "../../../../flux/actions/projectsActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";
import ReduxInput from "../../../UIComponents/FormElements/ReduxInput/ReduxInput";
import ReduxTextarea from "../../../UIComponents/FormElements/ReduxTextarea/ReduxTextarea";

// import { actionShowLoader } from "../../../../flux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";

const CreateProject = (props) => {
  const onModalCloseHandler = () => {
    if (props.onModalClose) props.onModalClose();
  };
  // submit handler
  const onSubmit = async (formValues) => {
    const createProjectSuccessCb = () => {
      onModalCloseHandler();
    };
    console.log(formValues);
    // run an action
    // props.actionShowLoader("createProjectModalForm", true);
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

  // note: can be used later
  // const renderLoader = () => {
  //   return <LoadingSpinner showLoader={props.showLoader} />;
  // };

  const renderContent = () => {
    return (
      <Modal
        componentClass="create-project"
        headingText="Create a Project"
        onModalClose={onModalCloseHandler}
      >
        <form id="create-project-form" autoComplete="off">
          <div className="create-project form__form-content modal-form-content">
            {renderErrorNotifications()}
            {/*name field*/}
            <Field
              name="name"
              component={ReduxInput}
              type="text"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Project Name",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "create-project-name-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Project Name *",
                  id: "create-project-name-label",
                },
              }}
            />
            {/*target goal*/}
            <Field
              name="target_goal"
              component={ReduxInput}
              type="number"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Target Goal",
                  className: "form__input",
                  autoComplete: "off",
                  id: "create-project-target_goal-field",
                  type: "number",
                },
                labelProps: {
                  className: "form__label",
                  text: "Target Goal *",
                  id: "create-project-target_goal-label",
                },
              }}
            />
            {/*project deadline*/}
            <Field
              name="deadline"
              component={ReduxInput}
              type="date"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Deadline",
                  className: "form__input",
                  autoComplete: "off",
                  id: "create-project-deadline-field",
                  type: "date",
                },
                labelProps: {
                  className: "form__label",
                  text: "Deadline *",
                  id: "create-project-deadline-label",
                },
              }}
            />
            {/*description field*/}
            <Field
              name="description"
              component={ReduxTextarea}
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Description",
                  className: "form__input",
                  autoComplete: "off",
                  id: "create-project-description-field",
                },
                labelProps: {
                  className: "form__label",
                  text: "Description ",
                  id: "create-project-description-label",
                },
              }}
            />
            <div className="form-button-container">
              <button
                id="create-project-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={props.handleSubmit(onSubmit)}
              >
                Create Project
              </button>
            </div>
          </div>
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
    errors.name = "Please input a project name.";
  }
  if (!formValues.target_goal) {
    errors.target_goal = "Please input the target goal amount.";
  }
  if (!formValues.deadline) {
    errors.deadline = "Please input the project's deadline.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  // showLoader: state.loader.showCreateProjectFormLoader,
});

const createProjectModalComponent = connect(mapStateToProps, {
  // actionShowLoader,
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
