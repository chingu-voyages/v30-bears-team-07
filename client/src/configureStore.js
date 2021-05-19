import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./flux/reducers";

export const middlewares = [ReduxThunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the redux store to be used by the Provider in index.js
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
