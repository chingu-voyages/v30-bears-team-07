import serverRest from "../../api/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
// Note: to be added later -tella
// import { actionShowLoader } from "./loaderActions";
// import { reset } from "redux-form";

// List of action types to be used
import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
} from "./types";

// Login User using Google sign in
export const googleSignIn =
  ({ userId, username, email }) =>
  (dispatch) => {
    const userInfo = { userId, username, email };
    serverRest
      .post("/auth/google_login", userInfo)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch({ type: GOOGLE_SIGN_IN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        // redirect to another page and clear the errors so it doesn't carry over
        const userId = res.data.user.id;
        history.push(`/users/${userId}/dashboard`);
        // dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: GOOGLE_SIGN_IN_FAIL,
        });
        /*
      console.log(err);
      console.log(err.response);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      */
      });
  };

export const googleSignOut = () => (dispatch) => {
  dispatch({
    type: GOOGLE_SIGN_OUT,
  });
};
