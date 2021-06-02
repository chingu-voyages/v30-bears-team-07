import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import "./Header.scss";

function Header(props) {
  const isAuth = useSelector((state) => state.auth.isSignedIn);

  return (
    <div className="header">
      <section className="nav">
        <Link to="/allprojects">All Projects</Link>
      </section>

      <section className="nav">
        {!isAuth ? <Link to="/login">Log in</Link> : ""}

        {isAuth ? <Link to="/dashboard">Dashboard</Link> : ""}
      </section>

      <section>
        <GoogleAuth />{" "}
      </section>
    </div>
  );
}

export default Header;
