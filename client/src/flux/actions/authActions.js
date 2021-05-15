
// List of action types to be used
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from "./types";

//Auth functions
export const authSignIn =
  ({ authMethod, userId }) =>
  (dispatch) => {
    dispatch({
      type: AUTH_SIGN_IN,
      payload: { authMethod, userId },
    });
  };

export const authSignOut = () => (dispatch) => {
  dispatch({
    type: AUTH_SIGN_OUT,
  });

};
