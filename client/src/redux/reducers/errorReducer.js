// Reducer related to error state management

import { FETCH_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: null,
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
