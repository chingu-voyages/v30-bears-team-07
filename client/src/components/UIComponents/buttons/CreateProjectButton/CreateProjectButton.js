import React, { useState, useEffect } from "react";
import CreateProjectForm from "../../../forms/project/CreateProject/CreateProject";

// import PlusIconImg from "../../../assets/icons/left-arrow.png";
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

  const renderButton = () => {
    // render different things based on screen size
    // if(isMobile)
    return (
      <button
        className={`btn btn--create ${getClassName()}`}
        id="create-project-button"
        onClick={onClickHandler}
        type="button"
      >
        {/*note: replace the + down there with and image (tella)*/}
        {/*
          <img
            id=""
            className={`btn btn--create__img ${getClassName()}`}
            // src={PlusIconImg}
            // alt="Plus Icon Icon"
          />
          */}
        +
      </button>
    );
  };

  const renderModal = () => {
    if (!isModalShown) return null;

    return <CreateProjectForm onModalClose={onModalCloseHandler} />;
  };

  return (
    <>
      {renderModal()}
      {renderButton()}
    </>
  );
};

export default CreateProjectButton;
