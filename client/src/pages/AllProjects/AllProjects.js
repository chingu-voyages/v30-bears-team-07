import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import Header from "../../components/Header/Header";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
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
          {projects.map((project, index) => (
            <ProjectItem project={project} key={project.id || index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
