// this just contains a list of all projects (not specific to one account only)
import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
  // REGISTER_SUCCESS,
  // LOGIN_SUCCESS,
  // LOGOUT_SUCCESS,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_SUCCESS:
    case GOOGLE_SIGN_IN_FAIL:
    case GOOGLE_SIGN_OUT:
      //note: either empty the list or reset it to 9 or the amount for a one page (tella)
      return [];
    case GET_ALL_PROJECTS_SUCCESS:
      return [...action.payload];
    case GET_ALL_PROJECTS_FAIL:
    default:
      return state;
  }
};
