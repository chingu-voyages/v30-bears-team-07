import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import "./AllProjects.scss";
import Header from "../../pages/Header/Header";

const AllProjects = () => {
  const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div>
      <Header />
      <section className="main">
        <div className="main__right">
          {projects.map((el) => (
            <div className="main__right--card">
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

export default AllProjects;
