import "./EditProject.scss";

import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { editProject } from "../../../flux/actions/projectsActions";

import { modalStatusReset } from "../../../flux/actions/modalActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

import { ProjectContext } from "../../AppContext";

import history from "../../../history";
const onInput = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleEnterKeyOnField = (e) => {};

const renderInput = ({ input, meta, inputProps, labelProps }) => {
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
      {renderError(meta, "edit-project")}
    </React.Fragment>
  );
};

const EditProject = (props) => {
  const { isSelectedProject } = useContext(ProjectContext);
  const project = props.initialValues;
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

  // submit handler
  const onSubmit = async (formValues) => {
    formValues.projectId = project._id;
    const successCb = () => {
      props.actionShowLoader("editProjectModalForm", false);
      props.onClose();
      if (isSelectedProject)
        history.push(
          `chat?project=${formValues.projectId}&userType=user&projectType=public`
        );
    };
    console.log(formValues);
    // check if it succeeded or it produced an error

    props.actionShowLoader("editProjectModalForm", true);
    await props.editProject(formValues, successCb);
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="edit-project"
        onModalClose={() => {
          console.log("closing edit-project modal");
          props.onClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Edit Project"
        actionButtons={
          <button
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Save
          </button>
        }
      >
        <form id="edit-project-form" autoComplete="off">
          <div className="edit-project form-content-container modal-form-content">
            {renderErrorNotifications()}
            <div className="textfield-container">
              <Field
                name="name"
                component={renderInput}
                type="text"
                props={{
                  inputProps: {
                    placeholder: "Name",
                    className: "textfield",
                    maxLength: "30",
                    autoComplete: "off",
                    id: "edit-project-name-field",
                    autoFocus: true,
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Name *",
                    id: "edit-project-name-label",
                  },
                }}
              />
            </div>

            <div className="textfield-container">
              <Field
                name="password"
                component={renderInput}
                type="password"
                props={{
                  inputProps: {
                    placeholder: "Project Password",
                    className: "textfield",
                    maxLength: "30",
                    autoComplete: "off",
                    type: "password",
                    id: "edit-project-password-field",
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Password",
                    id: "edit-project-password-label",
                  },
                }}
              />
            </div>
          </div>
          {/*this is only here so that Enter submit works*/}
          <button
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
            style={{ display: "none" }}
          >
            Save
          </button>
        </form>
      </Modal>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const validate = (formValues) => {
  console.log(formValues);
  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input a project name.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  editProjectSubmitSuccess: state.modalSubmit.editProjectSubmitSuccess,
  showLoader: state.loader.showEditProjectModalFormLoader,
});

const editProjectComponent = connect(mapStateToProps, {
  editProject,
  modalStatusReset,
  actionShowLoader,
})(EditProject);

export default reduxForm({
  form: "editProject",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(editProjectComponent);
