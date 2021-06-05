import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import BackButton from "../../components/UIComponents/buttons/BackButton";
import Header from "../../components/Header/Header";

import {
  getAllUserProjects,
  createProject,
} from "../../redux/actions/projectsActions";
import "./Dashboard.scss";
import "../../index.scss";
import CreateProjectButton from "../../components/UIComponents/buttons/CreateProjectButton/CreateProjectButton";

const Dashboard = ({
  getAllUserProjects,
  createProject,
  user,
  userProjects,
}) => {
  // useState
  const [showSettingsSection, setShowSettingsSection] = useState(false);
  const [showFundraisingSection, setShowFundraisingSection] = useState(false);
  const [showDonationsSection, setShowDonationsSection] = useState(false);

  //note:  this should just be moved to its own component
  const getAllProjectsHandler = () => {
    //add a guard to prevent errors if user is not loaded yet
    if (!user || !user.id) return null;
    getAllUserProjects(user.id);
  };

  // run this only after rendering the component and after user is loaded
  useEffect(() => {
    getAllProjectsHandler();
    /*return () => {}*/
  }, [user]);

  const renderMobileCreateButton = () => {
    return <CreateProjectButton className="dashboard" isMobile={true} />;
  };

  // const renderDesktopCreateButton = () => {
  //   return <CreateProjectButton className="dashboard" isMobile={false} />;
  // };

  const renderSettingsSection = () => {
    if (!showSettingsSection) return null;
    return <section className="dashboard__content"></section>;
  };
  const renderFundraisingSection = () => {
    if (!showFundraisingSection) return null;
    return <section className="dashboard__content"></section>;
  };
  const renderDonationsSection = () => {
    if (!showDonationsSection) return null;
    return <section className="dashboard__content"></section>;
  };

  return (
    <>
      <main className="dashboard page-container">
        <div className="dashboard__flex-outer-container">
          <section className="dashboard__menu-container">
            <ul className="dashboard__menu-items">
              <button className="dashboard__menu-button">
                <li className="dashboard__menu-item">Settings</li>
              </button>
              <button className="dashboard__menu-button">
                <li className="dashboard__menu-item">Fundraising</li>
              </button>
              <button className="dashboard__menu-button">
                <li className="dashboard__menu-item">Donations</li>
              </button>
            </ul>
          </section>
          {renderSettingsSection()}
          {renderFundraisingSection()}
          {renderDonationsSection()}
          {/*generic template for dashboard sections*/}
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
        </div>
      </main>
    </>

    /*<div>
      <section className="main">
        {renderMobileCreateButton()}
        <div className="main__left">
          <div className="main__left--info">
            <div>Settings</div>
            <div>Fundraiser</div>
            <div>Donations</div>
            <div>Info</div>
          </div>
        </div>
        <div className="main__right">
          {userProjects.owned.map((project, index) => (
            <div className="main__right--card" key={index}>
              <div>Image: </div>
              <h4>{project.name}</h4>
              <p>Last Donation: 8 min ago</p>
              <p>{project.amount_donated} raised</p>
            </div>
          ))}
        </div>
      </section>
    </div>*/
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  user: state.user.info,
  userProjects: state.userProjects,
});

export default connect(mapStateToProps, { getAllUserProjects, createProject })(
  Dashboard
);

/*
old render function

<div>
  <section className="main">
    {renderMobileCreateButton()}
    <div className="main__left">
      <div className="main__left--info">
        <div>Settings</div>
        <div>Fundraiser</div>
        <div>Donations</div>
        <div>Info</div>
      </div>
    </div>
    <div className="main__right">
      {userProjects.owned.map((project, index) => (
        <div className="main__right--card" key={index}>
          <div>Image: </div>
          <h4>{project.name}</h4>
          <p>Last Donation: 8 min ago</p>
          <p>{project.amount_donated} raised</p>
        </div>
      ))}
    </div>
  </section>
</div>

*/
