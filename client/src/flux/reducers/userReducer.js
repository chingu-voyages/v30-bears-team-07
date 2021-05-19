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
