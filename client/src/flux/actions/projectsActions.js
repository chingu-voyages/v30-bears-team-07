import axios from "axios";
import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
// import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";

import {
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CANCEL_PROJECT_SUCCESS,
  CANCEL_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  /*
  DONATE_TO_PROJECT_SUCCESS,
  DONATE_TO_PROJECT_FAIL,
  UPDATE_PROJECT_NAME_SUCCESS,
  UPDATE_PROJECT_NAME_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  EDIT_PROJECT_ICON_SUCCESS,
  EDIT_PROJECT_ICON_FAIL,
  */
} from "./types";

export const getAllProjects = (id) => (dispatch, getState) => {
  console.log("getting the list of all projects");
  const userId = id || getState().user.info._id || getState().user.info.id;
  serverRest
    .get(`/projects/`)
    .then((res) => {
      let projects = res.data;
      let sortedData = null;
      console.log(projects);

      // note: think about whether sorting projects should be up to the user
      // first check if it contains projects
      if (typeof projects !== "undefined" && projects.length > 0) {
        // the array is defined and has at least one element
        let data = null;
        console.log(projects);
        sortedData = projects.sort(compareValues("name"));
        console.log(sortedData);
      }

      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: sortedData || projects,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: GET_ALL_PROJECTS_FAIL,
      });
    });
};

export const createProject =
  (formValues, successCb) => (dispatch, getState) => {
    const userId = getState().user.info._id || getState().user.info.id;
    console.log(formValues);

    serverRest
      .post(`/projects/`, { ...formValues, senderId: userId })
      .then((res) => {
        const project = res.data.project;
        dispatch({
          type: CREATE_PROJECT_SUCCESS,
          payload: {
            project,
          },
        });
        dispatch(clearErrors());
        if (successCb) successCb();
        history.push(
          `/chat?project=${project._id}&userType=user&projectType=${project.type}`
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: CREATE_PROJECT_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("createProjectModalForm", false));
      });
  };

export const cancelProject = (projectId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(projectId);

  serverRest
    .patch(`/projects/${projectId}/cancel`, { projectId, userId })
    .then((res) => {
      dispatch({
        type: CANCEL_PROJECT_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CANCEL_PROJECT_FAIL,
      });
    })
    .finally(() => {});
};

export const deleteProject = (projectId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(projectId);

  axios
    .delete(``, {
      data: { projectId, userId },
    })
    .then((res) => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: DELETE_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("deleteProjectForm", false));
    });
};

/*
export const updateProjectName =
  (formValues, successCb) => (dispatch, getState) => {
    const userId = getState().user.info._id || getState().user.info.id;

    // note:might want to change this to projectId in the future
    serverRest
      .patch(`/projects/${formValues.projectId}/update_name`, {
        ...formValues,
        userId,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_PROJECT_NAME_SUCCESS,
          payload: {
            ...res.data,
          },
        });
        dispatch(clearErrors());
        if (successCb) successCb();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_PROJECT_NAME_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("updateProjectNameModalForm", false));
      });
  };

export const editProject = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;

  serverRest
    .patch(`/projects/${formValues.projectId}/edit_project`, {
      ...formValues,
      userId,
    })
    .then((res) => {
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: {
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EDIT_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("editProjectModalForm", false));
    });
};

export const editProjectIcon = (base64EncodedImage, projectId) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    try {
      await cloudinaryRest
        .patch(
          `/projects/${projectId}/upload_icon`,
          JSON.stringify({ data: base64EncodedImage, userId })
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: EDIT_PROJECT_ICON_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_PROJECT_ICON_FAIL"
        )
      );
      dispatch({ type: EDIT_PROJECT_ICON_FAIL });
    } finally {
      dispatch(actionShowLoader("uploadProjectIconForm", false));
    }
  };
};

*/
