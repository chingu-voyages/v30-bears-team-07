import "./ModalHeader.scss";

import React from "react";

import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";

//note: test the use of context, remove props. from the variables
const ModalHeader = (props) => {
  const getHeaderClassName = () =>
    props.headerClassName ? props.headerClassName : "";

  const renderBackButton = () => {
    // do not render a back button
    // if there is a property that tells it to be removed
    if (props.noBackButton) return null;
    return (
      <BackButton
        className={props.className}
        hideOnDesktop={true}
        onClickHandler={() => {
          props.onModalClose();
        }}
      />
    );
  };

  return (
    <header
      className={`modal-header ${props.className} ${props.headerClassName}`}
    >
      <div className="modal-heading-container modal-header-content-container">
        {renderBackButton()}
        <h3
          className={`modal-heading modal-header-heading ${props.className} `}
        >
          {props.headingText}
        </h3>
        <CloseButton
          className={`modal-header-close ${props.className}`}
          hideOnMobile={true}
          onClickHandler={() => {
            props.onModalClose();
          }}
        />
      </div>
    </header>
  );
};
export default ModalHeader;
