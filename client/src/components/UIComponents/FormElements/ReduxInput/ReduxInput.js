import React from "react";
import { renderError, getErrorClass } from "../../../../helpers";

const Input = ({ input, meta, formName, inputProps, labelProps }) => {
  // variables
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.className || "";
  const labelId = labelProps.id || "";
  // render
  return (
    <>
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
    </>
  );
};

export default Input;
