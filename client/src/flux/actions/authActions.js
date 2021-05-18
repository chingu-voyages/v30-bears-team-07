import serverRest from "../../api/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
// Note: to be added later -tella
// import { actionShowLoader } from "./loaderActions";
// import { reset } from "redux-form";

// List of action types to be used
import { GOOGLE_SIGN_IN, GOOGLE_SIGN_OUT } from "./types";

// Login User

export const googleSignIn =
  ({ userId, username, email }) =>
  (dispatch) => {
    // Check first if the user is already registered in the backend,
    // If not, create a user object
    serverRest.post("api/auth/register", formValues).then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.token);
      // redirect to another page and clear the errors so it doesn't carry over

      const userId = res.data.user._id;
      history.push(`/users/${userId}/home`);
      dispatch(clearErrors());
    });
    // If yes, just login the user
    dispatch({
      type: GOOGLE_SIGN_IN,
      payload: { userId, username, email },
    });
  };

export const loginUser = (formValues) => (dispatch) => {
  console.log("logging in the user");
  serverRest
    .post("/api/auth/login", formValues)
    .then((res) => {
      console.log(res.data);
      const userId = res.data.user._id;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(reset("loginForm"));
      // redirect and remove errors
      history.push(`/users/${userId}/home`);
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("loginForm", false));
    });
};

export const googleSignOut = () => (dispatch) => {
  dispatch({
    type: GOOGLE_SIGN_OUT,
  });
};
