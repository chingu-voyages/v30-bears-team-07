import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import "./Header.scss";

function Header(props) {
  const isAuth = useSelector((state) => state.auth.isSignedIn);
  const [open, setOpen] = useState(false);
  const toggleHeader = open ? "header display-block" : "header display-none";
  const toggleBurger = open ? "burger display-none" : "burger display-block";
  const toggleIcon = open ? "icon display-block" : "icon display-none";
  const handleClose = () => setOpen(!open);

  return (
    <div>
      <section className={toggleBurger} onClick={handleClose}>
        <div />
        <div />
        <div />
      </section>
      <div className={toggleHeader}>
        <span className={toggleIcon} onClick={handleClose}>
          Minimize
        </span>
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
    </div>
  );
}

export default Header;
