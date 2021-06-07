import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Fundraising from "./Fundraising/Fundraising";
import Donations from "./Donations/Donations";
// import BackButton from "../../components/UIComponents/buttons/BackButton";

import { getAllUserProjects } from "../../redux/actions/projectsActions";
import { WindowContext } from "../../AppContext";
import "./Dashboard.scss";
// import CreateProjectButton from "../../components/UIComponents/buttons/CreateProjectButton/CreateProjectButton";

const Dashboard = ({ getAllUserProjects, user, userProjects }) => {
  // should be opened by default in desktop mode
  const [showFundraisingSection, setShowFundraisingSection] = useState(false);
  const [showDonationsSection, setShowDonationsSection] = useState(false);
  const [showSettingsSection, setShowSettingsSection] = useState(false);
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);

  useEffect(() => {
    // automatically show the fundraising section when it is on non-mobile screen size
    if (isNonMobileWidth) setShowFundraisingSection(true);
    /*return () => {}*/
  }, []);

  const getAllProjectsHandler = () => {
    //add a guard to prevent errors if user is not loaded yet
    if (!user || !user.id) return null;
    console.log(getAllUserProjects);
    getAllUserProjects(user.id);
  };

  // run this only after rendering the component and after user is loaded
  useEffect(() => {
    getAllProjectsHandler();
    /*return () => {}*/
  }, [user]);

  const closeAllSectionsHandler = () => {
    setShowFundraisingSection(false);
    setShowDonationsSection(false);
    setShowSettingsSection(false);
  };

  const fundraisingButtonOnClickHandler = () => {
    closeAllSectionsHandler();
    setShowFundraisingSection(true);
  };
  const donationsButtonOnClickHandler = () => {
    closeAllSectionsHandler();
    setShowDonationsSection(true);
  };
  const settingsButtonOnClickHandler = () => {
    closeAllSectionsHandler();
    setShowSettingsSection(true);
  };

  const renderSettingsSection = () => {
    if (!showSettingsSection) return null;
    return <section className="dashboard__content"></section>;
  };

  const renderFundraisingSection = () => {
    if (!showFundraisingSection) return null;
    return (
      <Fundraising
        user={user}
        projects={userProjects.owned}
        onClose={closeAllSectionsHandler}
      />
    );
  };
  const renderDonationsSection = () => {
    if (!showDonationsSection) return null;
    return (
      <Donations
        user={user}
        projects={userProjects.supported}
        onClose={closeAllSectionsHandler}
      />
    );
  };

  return (
    <>
      <main className="dashboard page-container">
        <div className="dashboard__flex-outer-container">
          <section className="dashboard__menu-container">
            <ul className="dashboard__menu-items">
              <button
                className="dashboard__menu-button"
                onClick={fundraisingButtonOnClickHandler}
              >
                <li className="dashboard__menu-item">Fundraising</li>
              </button>
              <button
                className="dashboard__menu-button"
                onClick={donationsButtonOnClickHandler}
              >
                <li className="dashboard__menu-item">Donations</li>
              </button>
              {/*note: if there is not enough time this can be removed */}
              <button
                className="dashboard__menu-button"
                onClick={settingsButtonOnClickHandler}
              >
                <li className="dashboard__menu-item">Settings</li>
              </button>
            </ul>
          </section>
          {renderSettingsSection()}
          {renderFundraisingSection()}
          {renderDonationsSection()}
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  user: state.user.info,
  userProjects: state.userProjects,
});

export default connect(mapStateToProps, { getAllUserProjects })(Dashboard);

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
