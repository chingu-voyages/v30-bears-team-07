import warningImg from "../../../../assets/icons/warning.png";
import "./ErrorNotifications.scss";

import React, { useState } from "react";
import { connect } from "react-redux";

import { clearErrors } from "../../../../redux/actions/errorActions";

const ErrorNotification = (props) => {
  const [containerClass, setContainerClass] = useState(null);
  return (
    <div
      className={`error-notification-container ${containerClass}`}
      role="alert"
    >
      <div className="error-notification-text-div">
        <img
          className="server-side error-image"
          src={warningImg}
          alt="warning sign"
        ></img>

        <span>{props.message}</span>
      </div>
      <button
        type="button"
        className="server-side error close-button"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          setContainerClass("hide");
          setTimeout(props.clearErrors, 300);
        }}
      >
        x
      </button>
    </div>
  );
};

export default connect(null, { clearErrors })(ErrorNotification);
