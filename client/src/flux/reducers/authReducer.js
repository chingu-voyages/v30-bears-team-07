// Reducer related to authentication status
import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isSignedIn: false,
  userId: null,
  // the app will tried to load the user at first anyway, so may as well set it to true
  isLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isSignedIn: true,
        userId: action.payload.user.id,
        isLoading: false,
      };
    case GOOGLE_SIGN_OUT:
    case GOOGLE_SIGN_IN_FAIL:
      return {
        ...state,
        token: null,
        isSignedIn: false,
        user: null,
        userId: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
