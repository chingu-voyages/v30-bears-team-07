import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import Header from "../../components/Header/Header";
import Card from "../../components/UIComponents/Card/Card";
import { getAllProjects } from "../../redux/actions/projectsActions";
import "./AllProjects.scss";

const AllProjects = (props) => {
  const dispatch = useDispatch();
  // state variables
  const projects = useSelector((state) => state.allProjects);
  const user = useSelector((state) => state.user.info);

  const getAllProjectsHandler = () => {
    dispatch(getAllProjects());
  };

  // retrieve all projects after the component renders
  useEffect(() => {
    getAllProjectsHandler();
    /*return () => {}*/
  }, []);

  return (
    <div>
      <section className="main">
        <div className="main__right">
          <Card />
          {projects.map((project) => (
            <div className="main__right--card">
              <div>Image: </div>
              <h4>{project.name}</h4>
              <p>Last Donation: 8 min ago</p>
              <p>{project.amount_donated} raised</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
