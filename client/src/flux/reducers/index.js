import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import projectsReducer from "./projectsReducer";
import errorReducer from "./errorReducer";
// note: I will add these later (Tella - 5/14/21)
// import loaderReducer from "./loaderReducer.js";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  projects: projectsReducer,
  error: errorReducer,
  // loader: loaderReducer,
});
