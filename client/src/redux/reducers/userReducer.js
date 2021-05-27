// Reducer related to user info, this is different from auth
// Because it does not concern itself with authentication, just describing the user

import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  info: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        info: { ...action.payload.user },
      };
    case GOOGLE_SIGN_OUT:
    case GOOGLE_SIGN_IN_FAIL:
      return {
        ...state,
        info: null,
      };
    default:
      return state;
  }
};

/*
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EDIT_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_FAIL,
  EDIT_USER_AVATAR_SUCCESS,
  EDIT_USER_AVATAR_FAIL,
  REMOVE_USER_AVATAR_SUCCESS,
  REMOVE_USER_AVATAR_FAIL,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAIL,
  DISABLE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  info: null,
};

let sanitizedUserPayload = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,

        isLoading: false,
        info: { ...state.info, ...action.payload.user },
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case EDIT_USER_ACCOUNT_SUCCESS:
    case CHANGE_USER_PASSWORD_SUCCESS:
      sanitizedUserPayload = {
        info: { ...state.info, ...action.payload.user },
        isLoading: false,
      };
      console.log(sanitizedUserPayload);

      return {
        ...state,
        ...sanitizedUserPayload,
      };
    case EDIT_USER_AVATAR_SUCCESS:
      return {
        ...state,
        info: { ...state.info, ...action.payload.user },
      };
    case REMOVE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        info: { ...state.info, ...action.payload.user },
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case DISABLE_USER_ACCOUNT_SUCCESS:
    case DELETE_USER_ACCOUNT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        info: null,
        isLoading: false,
      };
    case EDIT_USER_ACCOUNT_FAIL:
    case CHANGE_USER_PASSWORD_FAIL:
    case EDIT_USER_AVATAR_FAIL:
    case REMOVE_USER_AVATAR_FAIL:
      return { ...state };
    default:
      return state;
  }
};

*/
