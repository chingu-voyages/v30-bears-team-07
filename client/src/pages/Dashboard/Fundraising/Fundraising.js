import React, { useState, useEffect } from "react";
import BackButton from "../../../components/UIComponents/buttons/BackButton";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";
import "./Fundraising.scss";
import CreateProjectButton from "../../../components/UIComponents/buttons/CreateProjectButton/CreateProjectButton";

const Fundraising = ({ user, projects, onClose }) => {
  const renderMobileCreateButton = () => {
    return <CreateProjectButton className="dashboard" isMobile={true} />;
  };

  // const renderDesktopCreateButton = () => {
  //   return <CreateProjectButton className="dashboard" isMobile={false} />;
  // };
  return (
    <>
      {renderMobileCreateButton()}
      <section className="dashboard__content">
        <div className="dashboard-content__header">
          <BackButton
            className="dashboard-content"
            hideOnDesktop={true}
            onClickHandler={onClose}
          />

          <h1 className="dashboard-content__heading">
            My Fundraising Projects
          </h1>
        </div>
        <section className="dashboard-content__section">
          <ul className="dashboard-projects__items">
            {projects.map((project, index) => (
              <li
                className="dashboard-projects__item"
                key={project.id || index}
              >
                <ProjectItem project={project} className="dashboard" />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Fundraising;
/*
<section className="dashboard__content">
  <div className="dashboard-content__header">
    <BackButton
      className="dashboard-content"
      hideOnDesktop={true}
      // onClickHandler={props.}
    />

    <h1 className="dashboard-content__heading">
      My Fundraising Projects
    </h1>
  </div>
  <section className="dashboard-content__section"></section>
</section>
*/
