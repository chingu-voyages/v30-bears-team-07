import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";

// note: I will add these later (Tella - 5/14/21)
// import errorReducer from "./errorReducer";
// import loaderReducer from "./loaderReducer.js";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  // note: I will add these later (Tella - 5/14/21)
  // error: errorReducer,
  // loader: loaderReducer,
});
