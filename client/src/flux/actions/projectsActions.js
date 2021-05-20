import axios from "axios";
import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";

import {
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
} from "./types";

export const getAllRooms = (id) => (dispatch, getState) => {
  console.log("getting all rooms");
  const userId = id || getState().user.info._id || getState().user.info.id;

  serverRest
    .get(`/api/rooms/`)
    .then((res) => {
      let rooms = res.data;
      let sortedData = null;
      console.log(rooms);

      // note: think about whether sorting rooms should be up to the user
      // first check if it contains rooms
      if (typeof rooms !== "undefined" && rooms.length > 0) {
        // the array is defined and has at least one element
        let data = null;
        console.log(rooms);
        sortedData = rooms.sort(compareValues("name"));
        console.log(sortedData);
      }

      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: sortedData || rooms,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: GET_ALL_PROJECTS_FAIL,
      });
    });
};

export const createRoom = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(formValues);

  serverRest
    .post(`/api/rooms/`, { ...formValues, senderId: userId })
    .then((res) => {
      const room = res.data.room;
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: {
          room,
        },
      });
      dispatch(clearErrors());
      if (successCb) successCb();
      history.push(
        `/chat?room=${room._id}&userType=user&roomType=${room.type}`
      );
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CREATE_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("createRoomModalForm", false));
    });
};

export const joinRoom = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  const roomName = formValues.name;
  console.log(formValues);

  // note:might want to change this to roomId in the future
  serverRest
    .patch(`/api/rooms/${roomName}/join`, { ...formValues, userId })
    .then((res) => {
      // if the server returns our response indicating that a message is required, ask the user for the password
      console.log(res.data);
      if (res.data.password_required) {
        dispatch({
          type: PROJECT_PASSWORD_REQUIRED,
          payload: res.data,
        });
        dispatch(clearErrors());
      } else {
        const room = res.data.room;
        dispatch({
          type: DONATE_TO_PROJECT_SUCCESS,
          payload: {
            room,
          },
        });
        dispatch(clearErrors());
        if (successCb) successCb();
        history.push(
          `/chat?room=${room._id}&userType=user&roomType=${room.type}`
        );
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: DONATE_TO_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("joinRoomForm", false));
    });
};

export const submitRoomPassword =
  (formValues, successCb) => (dispatch, getState) => {
    const userId = getState().user.info._id || getState().user.info.id;
    console.log(formValues);

    serverRest
      .patch(`/api/rooms/${formValues.roomId}/submit_room_password`, {
        ...formValues,
        userId,
      })
      .then((res) => {
        const room = res.data.room;
        dispatch({
          type: "PROJECT_PASSWORD_SUBMIT_SUCCESS",
          payload: { room },
        });
        dispatch(clearErrors());
        if (successCb) successCb();
        history.push(
          `/chat?room=${room._id}&userType=user&roomType=${room.type}`
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: "PROJECT_PASSWORD_SUBMIT_FAIL" });
      })
      .finally(() => {
        dispatch(actionShowLoader("roomPasswordConfirmation", false));
      });
  };

export const leaveRoom = (roomId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(roomId);

  // note:might want to change this to roomId in the future
  serverRest
    .patch(`/api/rooms/${roomId}/leave`, { roomId, userId })
    .then((res) => {
      dispatch({
        type: CANCEL_PROJECT_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CANCEL_PROJECT_FAIL,
      });
    })
    .finally(() => {});
};

export const updateRoomName =
  (formValues, successCb) => (dispatch, getState) => {
    const userId = getState().user.info._id || getState().user.info.id;

    // note:might want to change this to roomId in the future
    serverRest
      .patch(`/api/rooms/${formValues.roomId}/update_name`, {
        ...formValues,
        userId,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_PROJECT_NAME_SUCCESS,
          payload: {
            /*note: think about should be returned from the server as payload*/
            ...res.data,
          },
        });
        dispatch(clearErrors());
        if (successCb) successCb();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_PROJECT_NAME_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("updateRoomNameModalForm", false));
      });
  };

export const editRoom = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;

  serverRest
    .patch(`/api/rooms/${formValues.roomId}/edit_room`, {
      ...formValues,
      userId,
    })
    .then((res) => {
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EDIT_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("editRoomModalForm", false));
    });
};

export const editRoomIcon = (base64EncodedImage, roomId) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    try {
      await cloudinaryRest
        .patch(
          `/api/rooms/${roomId}/upload_icon`,
          JSON.stringify({ data: base64EncodedImage, userId })
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: EDIT_PROJECT_ICON_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_PROJECT_ICON_FAIL"
        )
      );
      dispatch({ type: EDIT_PROJECT_ICON_FAIL });
    } finally {
      dispatch(actionShowLoader("uploadRoomIconForm", false));
    }
  };
};

// please add remove image for room

export const deleteRoom = (roomId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(roomId);

  axios
    .delete(`https://amussement-server.herokuapp.com/api/rooms/${roomId}`, {
      data: { roomId, userId },
    })
    .then((res) => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: DELETE_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("deleteRoomForm", false));
    });
};
