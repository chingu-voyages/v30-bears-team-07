import React, { useEffect, useRef } from "react";
import { renderError, getErrorClass } from "../../../../helpers";

const Textarea = ({ input, meta, formName, inputProps, labelProps }) => {
  // variables
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.className || "";
  const labelId = labelProps.id || null;
  // ref
  const textareaRef = useRef(null);

  const OnInput = () => {
    if (textareaRef.current === null) return null;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const autoIncreaseHeight = () => {
    if (textareaRef.current === null) return null;
    const textarea = textareaRef.current;
    //Responsive textarea that increases the row count depending on the text content
    textarea.setAttribute(
      "style",
      "height:" + textarea.scrollHeight + "px;overflow-y:hidden;"
    );
    textarea.addEventListener("input", OnInput, false);
  };

  const autoIncreaseHeightCleanup = () => {
    if (textareaRef.current === null) return null;
    const textarea = textareaRef.current;
    textarea.removeEventListener("input", OnInput);
  };

  useEffect(() => {
    autoIncreaseHeight();
    return () => {
      autoIncreaseHeightCleanup();
    };
  }, [textareaRef.current]);

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
        ref={textareaRef}
        className={`${inputProps.className} ${errorClass}`}
        disabled={inputProps.disabled || false}
      ></textarea>

      {renderError(meta, formName)}
    </div>
  );
};

export default Textarea;
