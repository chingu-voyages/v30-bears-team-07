/* 
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CANCEL_PROJECT_SUCCESS,
  CANCEL_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DONATE_TO_PROJECT_SUCCESS,
  DONATE_TO_PROJECT_FAIL,
  UPDATE_PROJECT_NAME_SUCCESS,
  UPDATE_PROJECT_NAME_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  EDIT_PROJECT_ICON_SUCCESS,
  EDIT_PROJECT_ICON_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // action.payload.projects - array of projects
      return [...action.payload.projects];

    case GET_ALL_PROJECTS_SUCCESS:
      console.log(action.payload);
      return [...action.payload];
    case CREATE_PROJECT_SUCCESS:
    case JOIN_PROJECT_SUCCESS:
    case PROJECT_PASSWORD_SUBMIT_SUCCESS:
      // action.payload is an object that contains a project property (object)
      console.log(action.payload);
      console.log(action.payload.project);
      return [...state, action.payload.project];
    case LEAVE_PROJECT_SUCCESS:
      // action.payload.projects is array of projects
      return [...action.payload.projects];
    case UPDATE_PROJECT_NAME_SUCCESS:
      // action.payload is object with projectId and name
      return state.map((project) => {
        if (project._id === action.payload.projectId) {
          project.name = action.payload.name;
        }
        return project;
      });
    case EDIT_PROJECT_SUCCESS:
      // action.payload is project object
      return state.map((project) => {
        if (project._id === action.payload._id) {
          project = action.payload;
        }
        return project;
      });
    case EDIT_PROJECT_ICON_SUCCESS:
      return state.map((project) => {
        if (project._id === action.payload._id) {
          project.image_url = action.payload.image_url;
        }
        return project;
      });
    case DELETE_PROJECT_SUCCESS:
      return [...state].filter((project) => project._id !== action.payload.projectId);
    case CREATE_PROJECT_FAIL:
    case JOIN_PROJECT_FAIL:
    case LEAVE_PROJECT_FAIL:
    case EDIT_PROJECT_FAIL:
    case PROJECT_PASSWORD_SUBMIT_FAIL:
    case EDIT_PROJECT_ICON_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
*/
