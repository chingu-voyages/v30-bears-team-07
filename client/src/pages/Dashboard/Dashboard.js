import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import Header from "../../pages/Header/Header";

import {
  getAllUserProjects,
  createProject,
} from "../../flux/actions/projectsActions";
import "./Dashboard.scss";
import "../../index.scss";

// Shall we run and see? test that out :slight_smile:
const Dashboard = ({
  getAllUserProjects,
  createProject,
  user,
  userProjects,
}) => {
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

  const projects = [1, 2, 3, 4, 5];
  return (
    <div>
      <Header />
      <section className="main">
        <div className="main__left">
          <div className="main__left--info">
            <div>Settings</div>
            <div>Fundraiser</div>
            <div>Donations</div>
            <div>Info</div>
          </div>
        </div>
        <div className="main__right">
          {/*how to name this class? I'm going to plug the redux stuff and it would be main__btn--create? am not really sure
        I think create-button or btn--create is fine, I am not very familiar let me just plug in  react-redux
        - Yeah. I agree with btn--create */}

          {projects.map((el, index) => (
            <div className="main__right--card" key={index}>
              <div>Image: </div>
              <h4>Let's Get Dorian and Louise Wed</h4>
              <p>Last Donation: 8 min ago</p>
              <p>$15,916 raised</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  user: state.user.info,
  userProjects: state.userProjects,
});
//are you here? I can see what you're typing now, it's just...
//if we are going to make a create button,  we need it placed somewhere, for now styling doesnt matter much
//do you want to work on hooks? also retrieving the projects, but I need to BRB shouldn't you eat first?
// - I ate :)
export default connect(mapStateToProps, { getAllUserProjects, createProject })(
  Dashboard
);
