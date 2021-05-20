/* 
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CANCEL_PROJECT_SUCCESS,
  CANCEL_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DONATE_TO_PROJECT_SUCCESS,
  DONATE_TO_PROJECT_FAIL,
  UPDATE_PROJECT_NAME_SUCCESS,
  UPDATE_PROJECT_NAME_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  EDIT_PROJECT_ICON_SUCCESS,
  EDIT_PROJECT_ICON_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // action.payload.rooms - array of rooms
      return [...action.payload.rooms];

    case GET_ALL_PROJECTS_SUCCESS:
      console.log(action.payload);
      return [...action.payload];
    case CREATE_PROJECT_SUCCESS:
    case JOIN_PROJECT_SUCCESS:
    case PROJECT_PASSWORD_SUBMIT_SUCCESS:
      // action.payload is an object that contains a room property (object)
      console.log(action.payload);
      console.log(action.payload.room);
      return [...state, action.payload.room];
    case LEAVE_PROJECT_SUCCESS:
      // action.payload.rooms is array of rooms
      return [...action.payload.rooms];
    case UPDATE_PROJECT_NAME_SUCCESS:
      // action.payload is object with roomId and name
      return state.map((room) => {
        if (room._id === action.payload.roomId) {
          room.name = action.payload.name;
        }
        return room;
      });
    case EDIT_PROJECT_SUCCESS:
      // action.payload is room object
      return state.map((room) => {
        if (room._id === action.payload._id) {
          room = action.payload;
        }
        return room;
      });
    case EDIT_PROJECT_ICON_SUCCESS:
      return state.map((room) => {
        if (room._id === action.payload._id) {
          room.image_url = action.payload.image_url;
        }
        return room;
      });
    case DELETE_PROJECT_SUCCESS:
      return [...state].filter((room) => room._id !== action.payload.roomId);
    case CREATE_PROJECT_FAIL:
    case JOIN_PROJECT_FAIL:
    case LEAVE_PROJECT_FAIL:
    case EDIT_PROJECT_FAIL:
    case PROJECT_PASSWORD_SUBMIT_FAIL:
    case EDIT_PROJECT_ICON_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
*/
