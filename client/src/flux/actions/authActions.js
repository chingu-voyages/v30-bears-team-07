import serverRest from "../../api/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
// import { actionShowLoader } from "./loaderActions";
// import { reset } from "redux-form";
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
