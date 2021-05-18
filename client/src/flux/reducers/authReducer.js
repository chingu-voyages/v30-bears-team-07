import { GOOGLE_SIGN_IN, GOOGLE_SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  authMethod: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        authMethod: action.payload.authMethod,
        user: { userId: action.payload.userId },
      };
    case GOOGLE_SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        authMethod: null,
        user: null,
      };
    default:
      return state;
  }
};
