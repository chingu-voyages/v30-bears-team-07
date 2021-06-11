// Reducer related to user projects, this is different from all projects
// Because it only stores projects owned and supported by the user

import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  GET_ALL_USER_PROJECTS_SUCCESS,
  GET_ALL_USER_PROJECTS_FAIL,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CANCEL_PROJECT_SUCCESS,
  CANCEL_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
} from "../actions/types";

const INITIAL_STATE = { owned: [], supported: [] };

let owned, supported;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_SUCCESS:
    case LOGIN_SUCCESS:
      owned = action.payload.user.projectsOwned;
      supported = action.payload.user.projectsSupported;
      return { owned, supported };
    case GOOGLE_SIGN_OUT:
    case GOOGLE_SIGN_IN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
      return { owned: [], supported: [] };
    case GET_ALL_USER_PROJECTS_SUCCESS:
      owned = action.payload.projectsOwned;
      supported = action.payload.projectsSupported;
      return { owned, supported };
    case CREATE_PROJECT_SUCCESS:
      return { ...state, owned: [...state.owned, action.payload] };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        owned: state.owned.map((project) => {
          if (project.id == action.payload._id) {
            project = action.payload;
          }
          return project;
        }),
      };
    case EDIT_PROJECT_SUCCESS:
    case CANCEL_PROJECT_SUCCESS:
      return {
        ...state,
        owned: state.owned.map((project) => {
          if (project.id == action.payload._id) {
            project = action.payload;
          }
          return project;
        }),
      };
    case DELETE_PROJECT_SUCCESS:
      owned = [...state.owned].filter(
        (project) => project.id != action.payload.projectId
      );
      return { owned, supported: state.supported };
    case GET_ALL_USER_PROJECTS_FAIL:
    case CREATE_PROJECT_FAIL:
    case GET_PROJECT_FAIL:
    case EDIT_PROJECT_FAIL:
    case CANCEL_PROJECT_FAIL:
    case DELETE_PROJECT_FAIL:
    default:
      return state;
  }
};
