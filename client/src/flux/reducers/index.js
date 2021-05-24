import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import allProjectsReducer from "./allProjectsReducer";
import userProjectsReducer from "./userProjectsReducer";
import errorReducer from "./errorReducer";
// note: I will add these later (Tella - 5/14/21)
// import loaderReducer from "./loaderReducer.js";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  allProjects: allProjectsReducer,
  userProjects: userProjectsReducer,
  error: errorReducer,
  // loader: loaderReducer,
});
