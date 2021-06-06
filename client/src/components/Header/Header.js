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
    <div className="wrapper">
      <section className={toggleBurger} onClick={handleClose}>
        <div />
        <div />
        <div />
      </section>
      <div className={toggleHeader}>
        <p className={toggleIcon} onClick={handleClose}>
          X
        </p>
        <section className="nav">
          <button className="navlink">
            <Link to="/allprojects">All Projects</Link>
          </button>

          <button className="navlink">
            {!isAuth ? <Link to="/login">Log in</Link> : ""}

            {isAuth ? <Link to="/dashboard">Dashboard</Link> : ""}
          </button>

          <button>
            <GoogleAuth />{" "}
          </button>
        </section>
      </div>
    </div>
  );
}

export default Header;
