import React from "react";
import { renderError, getErrorClass } from "../../../../helpers";

const Input = ({ input, meta, formName, inputProps, labelProps }) => {
  // variables
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.className || "";
  const labelId = labelProps.id || null;

  // get rid of description placeholders
  if (input.name === "description") {
    input.value = input.value !== "No description provided." ? input.value : "";
  }

  // render
  return (
    <div className="textfield-container">
      <label htmlFor={inputProps.id} className={`${errorClass} ${labelClass}`}>
        {labelProps.text}
      </label>
      <textarea
        {...inputProps}
        {...input}
        rows={7}
        className={`${inputProps.className} ${errorClass}`}
        disabled={inputProps.disabled || false}
        onKeyDown={(e) => {
          this.handleEnterKeyOnField(e, input);
        }}
      ></textarea>

      {renderError(meta, formName)}
    </div>
  );
};

export default Input;
