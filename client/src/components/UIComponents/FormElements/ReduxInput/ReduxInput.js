import React from "react";
import { renderError, getErrorClass } from "../../../../helpers";

const ReduxInput = ({ input, meta, formName, inputProps, labelProps }) => {
  // variables
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.className || "";
  const labelId = labelProps.id || "";
  // render
  return (
    <div className="textfield-container">
      <label
        htmlFor={inputProps.id}
        className={`${errorClass} ${labelClass}`}
        id={labelId || ""}
      >
        {labelProps.text}
      </label>
      <input
        {...inputProps}
        {...input}
        className={`${inputProps.className} ${errorClass}`}
        autoFocus={inputProps.autoFocus || false}
      />
      {renderError(meta, formName)}
    </div>
  );
};

export default ReduxInput;
