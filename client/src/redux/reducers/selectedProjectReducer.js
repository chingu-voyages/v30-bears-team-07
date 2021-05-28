// this just contains a list of all projects (not specific to one account only)
import {
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  CLOSE_PROJECT,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_SUCCESS:
      return action.payload;
    // when you close a project page, it should reset back to {}
    case CLOSE_PROJECT:
      return {};
    case GET_PROJECT_FAIL:
    default:
      return state;
  }
};
