import React, { useState, useEffect } from "react";
import CreateProjectForm from "../../../forms/project/CreateProject/CreateProject";

// import PlusIconImg from "../../../icons/left-arrow.png";
import "./CreateProjectButton.scss";

const CreateProjectButton = (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  useEffect(() => {
    // code to run on first render
  }, []);

  const onClickHandler = () => {
    setIsModalShown(true);
  };

  const onModalCloseHandler = () => {
    setIsModalShown(false);
  };

  const getClassName = () => (props.className ? props.className : "");

  const renderButton = () => {};

  const renderModal = () => {
    if (!isModalShown) return null;

    return <CreateProjectForm onModalClose={onModalCloseHandler} />;
  };

  return (
    <>
      {renderModal()}
      <button
        className={`btn--create ${getClassName()}`}
        id="create-project-button"
        onClick={onClickHandler}
        type="button"
      >
        <img
          id=""
          className={`btn--create__img ${getClassName()}`}
          // src={PlusIconImg}
          // alt="Plus Icon Icon"
        />
        +
      </button>
    </>
  );
};

export default CreateProjectButton;
